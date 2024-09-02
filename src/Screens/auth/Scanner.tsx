import React, {useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import Action from '~/Store/Action';
import {UpdateCredential} from '~/Utils/auth';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Request from '~/Utils/request';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {MAINCOLORS} from '~/Utils/Colors';
import Empty from '~/Components/Empty';

export default function LoginScanner() {
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleBarCodeScanned = async ({data}) => {
    setLoading(true);
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
      setLoading(false);
      setScanned(false);
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
    console.log(res)
    setScanned(false);
    setLoading(false);
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
            onRead={onSuccess}
            showMarker={true}
            markerStyle={{
              borderColor: MAINCOLORS.primary,
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
        <View>
          <Empty
            imageurl={require('../../assets/image/Scanner.png')}
            buttonOnPress={() => setScanned(true)}
            title="Login By Scan"
            subtitle="You can see the barcode in Aiku"
            button={{size: 'lg', text: 'Start Scan', color: 'primary'}}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  qrCodeScanner: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
