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
import {reduxData} from '~/types/types';
import {Data,Root} from '~/types/indexShowDelivery';

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
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
        deliveryNote : Data;
    };
    path: string;
  };
};

const ShowDeliveryNote = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector((state: reduxData) => state.organisationReducer);
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState<Data | null>(null);
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation()
  const buttonFeatures = [
    {
      icon: {
        name: 'truck',
        type: 'font-awesome-5',
      },
      key: 'pallet',
      title: 'Pickings item in DeliveryNote',
      onPress: () => {
        setOpen(false);
        navigation.navigate('deliveryNotesItem', {deliveryNote : dataSelected})
      },
    },
  ];
 
  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'delivery-notes-show' ,
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        props.route.params.deliveryNote.id,
      ],
      onSuccessGetDetail,
      onFailedGetDetail,
    );
  };

  const onSuccessGetDetail = (response : Root ) => {
    setDataSelected(response.data);
    console.log(res)
    setLoading(false);
  };

  const onFailedGetDetail = (error : any) => {
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to get data',
    });
  };

  useFocusEffect(
    useCallback(() => {
      getDetail();
    }, [props.route.params.deliveryNote.id]),
  );

  return (
    <Layout>
      <>
        <Header
          title={props.route.params.deliveryNote.reference}
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

      </>
    </Layout>
  );
};

export const RenderContent: React.FC<Data | null> = ({dataSelected}) => {
  return (
    <View style={styles.containerContent}>
      <View style={styles.barcodeContainer}>
        <Barcode value={`${dataSelected.reference}`} width={1} height={70} />
        <Text style={styles.barcodeText}>{`${dataSelected.reference}`}</Text>
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Reference"
          text={defaultTo(dataSelected?.reference, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="State"
          text={defaultTo(dataSelected?.state, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="status"
          text={defaultTo(dataSelected?.status, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="type"
          text={defaultTo(dataSelected?.type, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="weight"
          text={defaultTo(dataSelected?.weight, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Customer Name"
          text={defaultTo(dataSelected?.customer_name, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Items"
          text={defaultTo(dataSelected?.number_items, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Last Updated"
          text={dayjs(dataSelected?.updated_at).format('DD-MM-YYYY')}
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

export default ShowDeliveryNote;
