import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';
import { Request } from '~/Utils';
import Empty from '~/Components/Empty';
import { MAINCOLORS } from '~/Utils/Colors';
import { useSelector } from 'react-redux';

type Props = {
  prefix?: string;
  onSuccess: (response: any) => void;
  onFailed: (error: any) => void;
};

export default function BaseScanner(props: Props) {
  const organisation = useSelector((state) => state.organisationReducer);
  const warehouse = useSelector((state) => state.warehouseReducer);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleBarCodeScanned = (data: string) => {
    setLoading(true);
    Request(
      'get',
      'global-search-scanner',
      {},
      props.prefix ? { type: props.prefix } : {},
      [organisation.active_organisation.id, warehouse.id, data],
      handleSuccess,
      handleFailed
    );
  };

  const handleSuccess = async (response: any) => {
    setScanned(false);
    setLoading(false);

    // Use the default or passed `onSuccess` behavior
    props.onSuccess(response);
  };

  const handleFailed = (error: any) => {
    console.log(error)
    setScanned(false);
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response?.data?.message || 'Failed to fetch data',
    });
    props.onFailed(error);
  };

  const onSuccessScanner = async (result: { data: string }) => {
    setScanned(false);
    handleBarCodeScanned(result.data);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={MAINCOLORS.primary} />
        </View>
      ) : scanned ? (
        <View style={styles.qrCodeScanner}>
          <QRCodeScanner
            showMarker={true}
            markerStyle={{ borderColor: MAINCOLORS.primary }}
            onRead={onSuccessScanner}
          />
        </View>
      ) : (
        <View>
          <Empty
            imageurl={require('../../assets/image/Scanner.png')}
            buttonOnPress={() => setScanned(true)}
            title=""
            subtitle=""
            button={{ size: 'lg', text: 'Start Scan', color: 'primary' }}
          />
        </View>
      )}
    </View>
  );
}

BaseScanner.defaultProps = {
  prefix: '',
  onSuccess: (response: any) => {
    const navigation = useNavigation();
    switch (response.data.model_type) {
      case 'Location':
        navigation.navigate('Location', { location: response.data.model });
        break;
      case 'Pallet':
        navigation.navigate('Pallet', { pallet: response.data.model });
        break;
      case 'PalletDelivery':
        navigation.navigate('Delivery', { delivery: response.data.model });
        break;
      case 'PalletReturn':
        navigation.navigate('Return', { return: response.data.model });
        break;
      default:
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Warning',
          textBody: 'Unknown model type',
        });
    }
  },
  onFailed: () => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'An error occurred while scanning.',
    });
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  qrCodeScanner: {
    flex: 1,
  },
});
