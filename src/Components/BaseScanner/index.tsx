import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text} from '@rneui/base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import {PrefixScanner, Request} from '~/Utils';

export default function BaseScanner(p) {
  const [scanned, setScanned] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleBarCodeScanned = (data: String) => {
    setLoading(true);
    Request(
      'get',
      p.urlKey,
      p.params,
      {},
      [...p.args, data],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = async res => {
    setScanned(false);
    setLoading(false);
    navigation.navigate(p.title, {[p.scannerKey]: res.data.model});
  };

  const onFailed = res => {
    setScanned(false);
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: res.response.data.message,
    });
  };

  const onSuccessScanner = async e => {
    if (PrefixScanner(p.prefix, e.data)) handleBarCodeScanned(e.data);
    else {
      setScanned(false);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: `you only can scan ${p.title} here`,
      });
    }
  };

  return !loading ? (
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
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <ActivityIndicator size={'large'} />
    </View>
  );
}

BaseScanner.defaultProps = {
  urlKey: 'global-search',
  args: [],
  params: {},
  title: '',
  scannerKey: '',
  prefix: '',
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
    marginRight: 10,
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
