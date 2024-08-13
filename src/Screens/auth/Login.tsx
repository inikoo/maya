import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, Button} from '@rneui/base';
import LoginSVG from '../../assets/image/20945391.jpg';
import {useFormik} from 'formik';
import Request from '~/Utils/request';
import {UpdateCredential} from '~/Utils/auth';
import {getBrand} from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import Action from '~/Store/Action';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MAINCOLORS} from '~/Utils/Colors';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onSendtoServer = async (data: object) => {
    setLoading(true);
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
    setLoading(false);
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
    setLoading(false);
    if(res?.response?.data?.errors){
      for (let error in res.response.data.errors) {
        formik.setErrors({
          [error]: res.response.data.errors[error][0],
        });
      }
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

  return (
    <SafeAreaView style={styles.containerView}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image source={LoginSVG} style={styles.image} />
        </View>

        <Text style={styles.loginText}>Login</Text>
        <View style={{marginBottom: 25}}>
          <View style={styles.FormTextInput}>
            <MaterialIcons
              name="alternate-email"
              size={18}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#c4c3cb"
              onChangeText={formik.handleChange('username')}
              value={formik.values.username}
              style={styles.input}
            />
          </View>
          {formik.errors.username && (
            <Text style={{color: MAINCOLORS.danger}}>
              {formik.errors.username}
            </Text>
          )}
        </View>

        <View style={{marginBottom: 25}}>
          <View style={styles.FormTextInput}>
            <MaterialIcons
              name="lock-outline"
              size={18}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#c4c3cb"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={formik.handleChange('password')}
              value={formik.values.password}
            />
          </View>
          {formik.errors.password && (
            <Text style={{color: MAINCOLORS.danger}}>
              {formik.errors.password}
            </Text>
          )}
        </View>

        <Button
          buttonStyle={styles.loginButton}
          onPress={formik.handleSubmit}
          loading={loading}
          title="Login"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Login Scanner')}
          style={{
            alignItems: 'center',
          }}>
          <Text>Login use QR code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
