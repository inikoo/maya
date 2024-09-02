import React, {useState, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Request, IconColor} from '~/Utils';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  BottomSheet,
  Icon,
  Divider,
  ListItem,
} from '@rneui/themed';
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

const DeliveryDetail = props => {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
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

  const onSuccessGetDetail = response => {
    setDataSelected(response.data);
    setLoading(false);
  };

  const onFailedGetDetail = error => {
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

  const onSuccessChangeStatus = res => {
    getDetail();
    setLoadingPrimary(false);
  };

  const onFailedChangeStatus = error => {
    console.log(error);
    setLoadingPrimary(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to change status',
    });
  };

  useFocusEffect(
    useCallback(() => {
      getDetail();
    }, [props.route.params.delivery.id])
  );

  return (
    <Layout>
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
            {dataSelected?.state === 'confirmed' && (
              <View>
                <AbsoluteButton
                  loading={loadingPrimary}
                  onPress={() => changeStatus({url: 'delivery-status-recived'})}
                  postion={{
                    bottom: -65,
                    left: 260,
                  }}
                  content={
                    <View>
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
                  onPress={() =>
                    changeStatus({url: 'delivery-status-not-recived'})
                  }
                  postion={{
                    bottom: 20,
                    left: 20,
                  }}
                  constainerStyle={{
                    backgroundColor: MAINCOLORS.danger,
                    height: 80,
                    width: 80,
                    borderRadius: 35,
                  }}
                  content={
                    <View>
                      <FontAwesomeIcon
                        style={{marginLeft: 10}}
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
            )}

            {dataSelected?.state === 'received' && (
              <View>
                <AbsoluteButton
                  onPress={() =>
                    changeStatus({url: 'delivery-status-booking-in'})
                  }
                  loading={loadingPrimary}
                  postion={{
                    bottom: -65,
                    left: 260,
                  }}
                  content={
                    <View>
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
            )}

            {dataSelected?.state === 'booking-in' && (
              <View>
                <AbsoluteButton
                  onPress={() =>
                    changeStatus({url: 'delivery-status-booked-in'})
                  }
                  loading={loadingPrimary}
                  postion={{
                    bottom: -65,
                    left: 260,
                  }}
                  content={
                    <View>
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
              </View>
            )}
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
      <BottomSheet modalProps={{}} isVisible={open}>
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
    </Layout>
  );
};

export const RenderContent = ({dataSelected = {}}) => {
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
              <Text style={{fontSize: 12, color: 'white'}}>
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
  },
});

export default DeliveryDetail;
