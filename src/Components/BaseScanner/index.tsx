import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Request from '~/Utils/request';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import { PrefixScanner } from '~/Utils';

export default function BaseScanner(p) {
  const [scanned, setScanned] = useState(true);
  const navigation = useNavigation();
  const handleBarCodeScanned = async (data) => {
    try {
      Request(
        'get',
        p.urlKey,
        p.params,
        {},
        [...p.args, data],
        onSuccess,
        onFailed,
      );
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Failed to perform',
      });
    }
  };

  const onSuccess = async res => {
    setScanned(false);
    navigation.navigate(p.title, { [p.scannerKey] : res })
  };

  const onFailed = res => {
    setScanned(false);
    console.error(res)
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: res.response.data.message,
    });
  };

  const onSuccessScanner = async e => {
    const data = await PrefixScanner(e.data)
    handleBarCodeScanned(data);
  };

  return (
    <View style={styles.container}>
      {scanned ? (
        <View style={styles.qrCodeScanner}>
          <QRCodeScanner {...p} onRead={onSuccessScanner} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setScanned(true)}>
          <Text style={styles.tryAgainText}>Scan Once More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

BaseScanner.defaultProps = {
  urlKey: '',
  args: [],
  params: {},
  title: '',
  scannerKey:''
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
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tryAgainText: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    maxHeight: 100,
    width: 100,
    marginRight: 10, // Add margin for separation
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  topContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginDescription: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
