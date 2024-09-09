import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert
} from 'react-native';
import {Request, IconColor} from '~/Utils';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Text, BottomSheet, Icon, Divider, ListItem} from '@rneui/themed';
import {defaultTo} from 'lodash';
import dayjs from 'dayjs';
import {MAINCOLORS} from '~/Utils/Colors';
import {findColorFromAiku} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Barcode from 'react-native-barcode-builder';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import AbsoluteButton from '~/Components/absoluteButton';
import { Data, Root} from '~/Types/DeliveryDetailTypes'
import { reduxData } from '~/Types/types'

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSeedling,
  faShare,
  faCheck,
  faTimes,
  faCheckDouble,
  faSpellCheck,
} from 'assets/fa/pro-light-svg-icons';

library.add(faSeedling, faShare, faSpellCheck, faCheck, faTimes, faCheckDouble);

type Props = {
  navigation : any
  route : {
    key: string;
    name: string;
    params: {
      delivery : Object
    };
    path: string;
  }
}

const DeliveryDetail = (props : Props) => {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector((state : reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState<Data|null>(null);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [loadingPrimary, setLoadingPrimary] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const buttonFeatures = [
    {
      icon: {
        name: 'truck',
        type: 'font-awesome-5',
      },
      key: 'pallet',
      title: 'Pallet in Delivery',
      onPress: () => {
        navigation.navigate('Delivery Pallet', {delivery: dataSelected});
        setOpen(false);
      },
    },
  ];

  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'delivery-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        props.route.params.delivery.id,
      ],
      onSuccessGetDetail,
      onFailedGetDetail,
    );
  };

  const onSuccessGetDetail = (response: Root) => {
    setDataSelected(response.data);
    setLoading(false);
  };

  const onFailedGetDetail = (error: any) => {
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to get data',
    });
  };

  const changeStatus = ({url = ''}) => {
    setLoadingPrimary(true);
    Request(
      'patch',
      url,
      {},
      {},
      [props.route.params.delivery.id],
      onSuccessChangeStatus,
      onFailedChangeStatus,
    );
  };

  const onSuccessChangeStatus = (res: any) => {
    getDetail();
    setLoadingPrimary(false);
  };

  const onFailedChangeStatus = (error: any) => {
    setLoadingPrimary(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to change status',
    });
  };

  const AlertBookedIn = () => {
    Alert.alert('Booked in !', 'You need to check the pallet, before set Delivery to Booked In', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: "cancel"
      },
      {text: 'Yes', onPress: () => navigation.navigate('Delivery Pallet', {delivery: dataSelected})},
    ],
    { cancelable: true }
  );
  };

  const ButtonAbsoluteRender = () => {
    if (dataSelected?.state === 'confirmed') {
      return (
        <View>
          <AbsoluteButton
            loading={loadingPrimary}
            onPress={() => changeStatus({url: 'delivery-status-recived'})}
            content={
              <View style={styles.centerContent}>
                <FontAwesomeIcon
                  icon={faCheck}
                  size={30}
                  color={'white'}
                />
                <Text style={{color: 'white', fontSize: 10}}>
                  Received
                </Text>
              </View>
            }
          />
          <AbsoluteButton
            onPress={() => changeStatus({url: 'delivery-status-not-recived'})}
            position={{
              bottom: 10,
              left: 20,
            }}
            containerStyle={{
              backgroundColor: 'red',
              height: 80,
              width: 80,
              borderRadius: 40, 
            }}
            content={
              <View style={styles.centerContent}>
                <FontAwesomeIcon
                  icon={faTimes}
                  size={30}
                  color={'white'}
                />
                <Text style={{color: 'white', fontSize: 10}}>
                  Not Received
                </Text>
              </View>
            }
          />
        </View>
      );
    }
  
    if (dataSelected?.state === 'received') {
      return (
        <View>
          <AbsoluteButton
            onPress={() => changeStatus({url: 'delivery-status-booking-in'})}
            loading={loadingPrimary}
            content={
              <View style={styles.centerContent}>  
                <FontAwesomeIcon
                  icon={faCheck}
                  size={30}
                  color={'white'}
                />
                <Text style={{color: 'white', fontSize: 10}}>
                  Booking in
                </Text>
              </View>
            }
          />
        </View>
      );
    }
  
    if (dataSelected?.state === 'booking-in') {
      return (
        <AbsoluteButton
          onPress={() => 
            // changeStatus({url: 'delivery-status-booked-in'})
            AlertBookedIn()
          }
          loading={loadingPrimary}
          content={
            <View style={styles.centerContent}>
              <FontAwesomeIcon
                icon={faCheckDouble}
                size={30}
                color={'white'}
              />
              <Text style={{color: 'white', fontSize: 10}}>
                Booked in
              </Text>
            </View>
          }
        />
      );
    }
  
    return null;
  };
  

  useFocusEffect(
    useCallback(() => {
      if(props.route.params.delivery) getDetail();
      else navigation.navigate('Goods In')
    }, [props.route.params.delivery.id]),
  );

  return (
    <Layout>
      <>
        <Header
          title={props.route.params.delivery.reference}
          useLeftIcon={true}
          rightIcon={
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Icon name="menu" type="entypo" />
            </TouchableOpacity>
          }
        />
        <Divider />
        <View style={styles.container}>
          {!loading ? (
            <View>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => getDetail()}
                  />
                }>
                <RenderContent dataSelected={dataSelected} />
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color={MAINCOLORS.primary} />
            </View>
          )}
        </View>
        <BottomSheet isVisible={open}>
          <View style={styles.wrapper}>
            <Header
              title="Menu"
              rightIcon={
                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  style={{marginRight: 15}}>
                  <Icon
                    color={MAINCOLORS.danger}
                    name="closecircle"
                    type="antdesign"
                    size={20}
                  />
                </TouchableOpacity>
              }
            />
            <Divider />
            <View style={{marginVertical: 15}}>
              {buttonFeatures.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={{...l.containerStyle}}
                  onPress={l.onPress}>
                  <Icon {...l.icon} size={18} />
                  <ListItem.Content>
                    <ListItem.Title>{l.title}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          </View>
        </BottomSheet>
        {ButtonAbsoluteRender()}
      </>
    </Layout>
  );
};

export const RenderContent = ({dataSelected} : Data) => {
  return (
    <View style={styles.containerContent}>
      <View style={styles.barcodeContainer}>
        <Barcode value={`${dataSelected.reference}`} width={1} height={70} />
        <Text style={styles.barcodeText}>{`${dataSelected.reference}`}</Text>
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Reference"
          text={defaultTo(dataSelected.reference, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Boxes"
          text={defaultTo(dataSelected.number_boxes, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Oversizes"
          text={defaultTo(dataSelected.number_oversizes, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Pallets"
          text={defaultTo(dataSelected.number_pallets, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Physical Goods"
          text={defaultTo(dataSelected.number_physical_goods, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="State"
          text={
            <View
              style={{
                ...styles.stateContainer,
                backgroundColor: findColorFromAiku(
                  dataSelected?.state_icon?.color,
                ),
              }}>
              <FontAwesomeIcon
                icon={dataSelected?.state_icon?.icon}
                color="white"
                size={12}
              />
              <Text style={{fontSize: 12, color: 'white', fontWeight : 500}}>
                {defaultTo(dataSelected.state_label, '-')}
              </Text>
            </View>
          }
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Created At"
          text={dayjs(dataSelected.created_at).format('DD-MM-YYYY')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Set background color to white
  },
  wrapper: {
    backgroundColor: '#ffffff',
    padding: 15,
  },
  containerContent: {
    flex: 1,
    padding: 15,
  },
  rowDetail: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC', // Light gray border color
    paddingVertical: 15,
  },
  barcodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  barcodeText: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  chip: {
    marginVertical: 2,
    marginHorizontal: 2,
  },
  speedDial: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  stateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 5,
    paddingVertical: 2,
    width : 100
  },
  centerContent: {
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
});

export default DeliveryDetail;
