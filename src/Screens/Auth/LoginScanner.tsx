import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import Action from '~/Store/Action';
import {COLORS} from '~/Constant/Color';
import {UpdateCredential} from '~/Utils/auth';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Request from '~/Utils/request';
import { Icon } from 'react-native-paper';
import Logo from '../../assets/images/Logo.png';

export default function LoginScanner() {
  const [scanned, setScanned] = useState(true);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
      showMessage({
        message: error.message || 'Failed to perform login',
        type: 'danger',
      });
    }
  };

  const onLoginSuccess = async res => {
    setScanned(false);
    setToken(res.token);
    const profile = await UpdateCredential(res.token);
    if (profile.status == 'Success') {
      dispatch(
        Action.CreateUserSessionProperties({...profile.data, token: res.token}),
      );
      navigation.navigate('Home');
    } else {
      showMessage({
        message: 'failed to get user data',
        type: 'danger',
      });
    }
  };

  const onLoginFailed = res => {
    console.log(res);
    setScanned(false);
    if(res.response.data.message){
      showMessage({
        message: res.response.data.message,
        type: 'danger',
      });
    }else{
      showMessage({
        message: 'Authentication failed. Please check your credentials and try again.',
        type: 'danger',
      });
    }
   
  };

  const onSuccess = e => {
    console.log('maujjjj')
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
              borderColor: COLORS.primary,
            }}
            topContent={
              <View style={styles.topContentContainer}>
                <View style={styles.row}>
                  <Image source={Logo} style={styles.logo} />
                  <Text style={styles.loginContinueTxt}></Text>
                </View>
              </View>
            }
            bottomContent={
              <View style={styles.topContentContainer}>
                <View style={styles.row}>
                  <Text style={styles.loginDescription}>You can find the barcode from aiku.com</Text>
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
    color: COLORS.black,
    fontWeight: 'bold',
  },
  topContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginDescription:{
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.black,
    fontWeight: 'bold',
  }
});
