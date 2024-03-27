import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Button} from '@rneui/themed';
import {useFormik} from 'formik';
import styles from './style';
import Request from '~/Utils/request';
import {UpdateCredential} from '~/Utils/auth';
import {getBrand} from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import Action from '~/Store/Action';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSendtoServer = async (data: object) => {
    await Request(
      'post',
      'login-form',
      {},
      data,
      [],
      onLoginSuccess,
      onLoginFailed,
    );
  };

  const onLoginSuccess = async (res: {token: String}) => {
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

  const onLoginFailed = (res: {
    response: {data: {[key: string]: string[]}};
  }) => {
    for (let error in res.response.data.errors) {
      formik.setErrors({
        [error]: res.response.data.errors[error][0],
      });
    }
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Failed to login',
    });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      device_name: getBrand(),
    },
    onSubmit: onSendtoServer,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@AuthenticationToken:Key');
        const organisation = await AsyncStorage.getItem('@organisation:Key');
        const warehouse = await AsyncStorage.getItem('@warehouse:Key');
        
        console.log(storedUser);
        console.log(organisation);
        console.log(warehouse);
        
        // Lakukan apa pun yang Anda perlu lakukan dengan data yang diambil dari AsyncStorage
      } catch (error) {
        // Tangani kesalahan jika diperlukan
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };
  
    fetchData(); // Panggil fungsi fetchData di dalam useEffect
  
  }, []);


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>MAYA</Text>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={formik.handleChange('username')}
              value={formik.values.username}
            />
            {formik.errors.username && (
              <Text style={{color: 'red'}}>{formik.errors.username}</Text>
            )}
            <TextInput
              placeholder="Password"
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              onChangeText={formik.handleChange('password')}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <Text style={{color: 'red'}}>{formik.errors.password}</Text>
            )}
            <Button
              buttonStyle={styles.loginButton}
              onPress={formik.handleSubmit}
              title="Login"
            />
            <TouchableOpacity style={{ margin : 20, display: 'flex', justifyContent: 'center', alignItems:'center'}}>
              <Text style={styles.goToScannerText}>
                <Text onPress={() => navigation.navigate('Login Scanner')}>
                  Login use QR code
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
