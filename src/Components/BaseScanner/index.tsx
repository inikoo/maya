import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import {Request} from '~/Utils';
import Empty from '~/Components/Empty';
import {MAINCOLORS} from '~/Utils/Colors';
import {useSelector} from 'react-redux';
import {reduxData} from '~/Utils/types';

type Props = {
  prefix?: string
  onSuccess: Function
  onFailed: Function
}

const onSuccess = async (response : any) => {
  const navigation = useNavigation();
  switch (response.data.model_type) {
    case 'Location':
      return  navigation.navigate( 'Location', { location : response.data.model});
    case 'Pallet':
      return navigation.navigate( 'Pallet', { pallet : response.data.model});
    case 'PalletDelivery':
      return navigation.navigate( 'Delivery', { delivery : response.data.model});
    case 'PalletReturn':
      return navigation.navigate( 'Return', { return : response.data.model});
    default:
      return null
  }
};


export default function BaseScanner(props : Props) {
  const organisation = useSelector((state:reduxData) => state.organisationReducer);
  const warehouse = useSelector((state :reduxData) => state.warehouseReducer);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

   const handleBarCodeScanned = (data: String) => {
    setLoading(true);
    Request(
      'get',
      'global-search-scanner',
      {},
      props.prefix ? { type : props.prefix } : {},
      [organisation.active_organisation.id, warehouse.id, data],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = async (response : any) => {
    setScanned(false);
    setLoading(false);
    props.onSuccess(response)
  };

  const onFailed = (error : any) => {
    setScanned(false);
    setLoading(false);
    props.onFailed(error)
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

  const onSuccessScanner = async (result : Object) => {
    setScanned(false);
    handleBarCodeScanned(result.data)
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={MAINCOLORS.primary} />
        </View>
      ) : scanned ? (
        <View style={styles.qrCodeScanner}>
          <QRCodeScanner 
             showMarker={true}
             markerStyle={{
                 borderColor : MAINCOLORS.primary
             }}
            onRead={onSuccessScanner} />
        </View>
      ) : (
        <View>
          <Empty
            imageurl={require('../../assets/image/Scanner.png')}
            buttonOnPress={() => setScanned(true)}
            title=""
            subtitle=""
            button={{size: 'lg', text: 'Start Scan', color: 'primary'}}
          />
        </View>
      )}
    </View>
  );
}

BaseScanner.defaultProps = {
  onSuccess: onSuccess,
  onFailed: ()=>null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCodeScanner: {
    flex: 1,
  },
});
