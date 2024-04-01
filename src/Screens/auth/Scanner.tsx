import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import Action from '~/Store/Action';
import {UpdateCredential} from '~/Utils/auth';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Request from '~/Utils/request';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import { MAINCOLORS } from '~/Utils/Colors';

export default function LoginScanner() {
  const [scanned, setScanned] = useState(true);
  const dispatch = useDispatch();

  const handleBarCodeScanned = async ({data}) => {
    try {
      Request(
        'post',
        'login-scanner',
        {},
        {code: data, device_name: 'android'},
        [],
        onLoginSuccess,
        onLoginFailed,
      );
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Failed to perform login',
      });
    }
  };

  const onLoginSuccess = async res => {
    setScanned(false);
    const profile = await UpdateCredential(res.token);
    if (profile.status == 'Success') {
      dispatch(
        Action.CreateUserSessionProperties({...profile.data, token: res.token}),
      );
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Failed to find sessions',
      });
    }
  };

  const onLoginFailed = res => {
    setScanned(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Failed to login',
    });
  };

  const onSuccess = e => {
    handleBarCodeScanned(e);
  };

  return (
    <View style={styles.container}>
      {scanned ? (
        <View style={styles.qrCodeScanner}>
          <QRCodeScanner
            onRead={onSuccess}
            showMarker={true}
            markerStyle={{
                borderColor : MAINCOLORS.primary
            }}
            bottomContent={
              <View style={styles.topContentContainer}>
                <View style={styles.row}>
                  <Text style={styles.loginDescription}>
                    You can find the barcode from aiku.com
                  </Text>
                </View>
              </View>
            }
          />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setScanned(true)}>
          {/*  <Icon source="qrcode-scan" size={200} /> */}
          <Text style={styles.tryAgainText}>Scan Once More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

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
