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
import { useNavigation } from '@react-navigation/native';

function PalletDetail(props) {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const [pageMovement, setPageMovement] = useState(false);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation()


/*   const ChangeStatus = async (data: object) => {
    await Request(
      'patch',
      'pallet-location',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        data.location.id,
        dataSelected.id,
      ],
      onMoveSuccess,
      onMoveFailed,
    );
  };

  const ChangeStatusSuccess = response => {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet already move to new Location',
    });
    setPageMovement(false);
    getDetail();
  };

  const ChangeStatusFailed = response => {
    console.error(response);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Success',
      textBody: response.response.data.message,
    });
  }; */


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


  useEffect(() => {
    getDetail();
  }, [props.route.params.pallet]);

  return !loading ? (
    <View style={styles.container}>
      <ScrollView>{renderContent()}</ScrollView>
      <SpeedDial
        isOpen={open}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        style={styles.speedDial}
        onPress={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{name: 'location-pin', type: 'material-icons'}}
          title="Move Location"
          onPress={() => navigation.navigate('Pallet Movement',{pallet : dataSelected})}
        />
        <SpeedDial.Action
          icon={{name: 'box', type: 'entypo'}}
          title="Stored Items"
        />
      </SpeedDial>
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
