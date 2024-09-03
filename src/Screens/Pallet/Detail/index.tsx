// Import necessary components
import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {Text, SpeedDial} from '@rneui/themed';
import {defaultTo} from 'lodash';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Barcode from 'react-native-barcode-builder';
import {useNavigation} from '@react-navigation/native';
import { MAINCOLORS } from '~/Utils/Colors';

function PalletDetail(props) {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [finalFeatures, setFinalFeatures] = useState([]);
  const [finalBuutonFeatures, setfinalBuutonFeatures] = useState([]);

  const ChangeStatus = async (data: object) => {
    console.log(data)
    await Request(
      'patch',
      'pallet-change-sattus-state',
      {},
      data,
      [
        organisation.active_organisation.id,
        warehouse.id,
        organisation.active_organisation.active_authorised_fulfilments.id,
        dataSelected.id,
      ],
      ChangeStatusSuccess,
      ChangeStatusFailed,
    );
  };

  const ChangeStatusSuccess = response => {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet already updated',
    });
    getDetail();
  };

  const ChangeStatusFailed = response => {
    if(response?.response?.data?.message){
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'failed',
        textBody: response.response.data.message,
      });
    }else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'failed',
        textBody: 'server error',
      });
    }
 
  };

  // Function to fetch details
  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'pallet-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        organisation.active_organisation.active_authorised_fulfilments.id,
        props.route.params.pallet.id,
      ],
      onSuccessGetDetail,
      onFailedGetDetail,
    );
  };

  // Success callback for detail fetch
  const onSuccessGetDetail = response => {
    setDataSelected(response.data);
    setLoading(false);
    setUpFeaturesPallet(response.data.state,response.data.status);
  };

  // Error callback for detail fetch
  const onFailedGetDetail = error => {
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

  const renderContent = () => {
    return (
      <View style={styles.containerContent}>
        <View style={styles.barcodeContainer}>
          <Barcode value={`loc-${dataSelected.slug}`} width={1} height={70} />
          <Text style={styles.barcodeText}>{`loc-${dataSelected.slug}`}</Text>
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Reference"
            text={defaultTo(dataSelected.reference, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Customer Name"
            text={defaultTo(dataSelected.customer_name, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Customer Reference"
            text={defaultTo(dataSelected.customer_reference, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Location"
            text={defaultTo(dataSelected.location?.code, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Status"
            text={defaultTo(dataSelected.status, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow title="State" text={defaultTo(dataSelected.state, '-')} />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow title="Notes" text={defaultTo(dataSelected.notes, '-')} />
        </View>
      </View>
    );
  };

  const buttonFeatures = [
    {
      icon: {
        name: 'location-pin',
        type: 'material-icons',
      },
      key: 'move_location',
      title: 'Move Location',
      onPress: () =>
        navigation.navigate('Pallet Movement', {pallet: props.route.params.pallet}),
    },
    {
      icon: {
        name: 'times',
        type: 'font-awesome-5',
      },
      title: 'not received',
      key: 'not_recived',
      onPress: ()=>ChangeStatus({ state : "not-received"}),
    },
    {
      icon: {
        name: 'check',
        type: 'font-awesome-5',
      },
      title: 'recived',
      key: 'received',
      onPress: ()=>ChangeStatus({ state : "received"}),
    },
    {
      icon: {
        name: 'check',
        type: 'font-awesome-5',
      },
      title: 'Storing',
      key: 'storing',
      onPress: ()=>ChangeStatus({ state : "storing"}),
    },
    {
      icon: {
        name: 'check',
        type: 'font-awesome-5',
      },
      title: 'Picking',
      key: 'picking',
      buttonStyle:{backgroundColor: MAINCOLORS.success},
      onPress: ()=>ChangeStatus({ state : "picking"}),
    },
    {
      icon: {
        name: 'check',
        type: 'font-awesome-5',
      },
      title: 'Picked',
      key: 'picked',
      buttonStyle:{backgroundColor: MAINCOLORS.success},
      onPress: ()=>ChangeStatus({ state : "picked"}),
    },
    {
      icon: {
        name: 'check',
        type: 'font-awesome-5',
      },
      title: 'Dispatched',
      key: 'dispatched',
      buttonStyle:{backgroundColor: MAINCOLORS.success},
      onPress: ()=>ChangeStatus({ state : "dispatched"}),
    },
    {
      icon: {
        name: 'glass-fragile',
        type: 'material-community',
      },
      title: 'Damaged',
      key: 'damaged',
      buttonStyle:{backgroundColor: MAINCOLORS.danger},
      onPress: ()=>ChangeStatus({ state : "damaged"}),
    },
    {
      icon: {
        name: 'ghost',
        type: 'font-awesome-5',
      },
      title: 'Lost',
      key: 'lost',
      buttonStyle:{backgroundColor: MAINCOLORS.danger},
      onPress: ()=>ChangeStatus({ state : "lost"}),
    },
  ];

  const filterFeatures = filter => {
    const data = buttonFeatures.filter(item => {
      return filter.includes(item.key);
    });
    setFinalFeatures(data);
  };

  const setUpFeaturesPallet = (state,status) => {
    console.log(state,status)
    if(status == "receiving" ){
      if (state == 'received')
        filterFeatures(["move_location",'recived', 'not_recived', 'damaged','lost' , 'stored_item']);
      if (state == 'not-received')
        filterFeatures(['received']);
      if (state == 'damaged')
        filterFeatures([]);
      if (state == 'lost')
        filterFeatures([]);
    }if(status == 'not-received'){
      filterFeatures(['received']);
    }if(status == 'storing'){
      if (state == 'storing')
        filterFeatures(['move_location', 'lost', 'damaged', 'stored_item']);
      if (state == 'damaged')
        filterFeatures([]);
      if (state == 'lost')
        filterFeatures([]);
    }if(status == 'returning'){
        if (state == 'picking')
          filterFeatures(['picked', 'lost', 'damaged', 'stored_item']);
        if (state == 'picked')
          filterFeatures(['dispatched', 'lost', 'damaged', 'stored_item']);
        if (state == 'damaged')
          filterFeatures([]);
        if (state == 'lost')
          filterFeatures([]);
    }if(status == 'returned'){
        filterFeatures([]);
    }if(status == 'incident'){
        filterFeatures([]);
  };
}

  useEffect(() => {
    getDetail();
  }, [props.route.params.pallet]);

  return !loading ? (
    <View style={styles.container}>
      <ScrollView>{renderContent()}</ScrollView>
      {finalFeatures.length != 0 && (
        <SpeedDial
          isOpen={open}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}
          style={styles.speedDial}
          onPress={() => setOpen(!open)}>
          {finalFeatures.map((item, index) => {
            return <SpeedDial.Action {...item} />;
          })}
        </SpeedDial>
      )}
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerContent: {
    flex: 1,
    padding: 20,
  },
  rowDetail: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
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
});

export default PalletDetail;
