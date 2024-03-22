import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Request from './request';


export async function WriteCredential(data: object) {
  try {
    await AsyncStorage.setItem(
      '@AuthenticationToken:Key',
      JSON.stringify(data),
    );
  } catch (err) {
    Alert.alert(err.message);
  }
}

export async function WriteOrganisation(data: object) {
  try {
    await AsyncStorage.setItem('@organisation:Key', JSON.stringify(data));
  } catch (err) {
    Alert.alert(err.message);
  }
}

export async function RemoveCredential() {
  try {
    await AsyncStorage.removeItem('@AuthenticationToken:Key');
    await AsyncStorage.removeItem('@organisation:Key');
    console.log('dddd')
  } catch (err) {
    console.log('sss',err)
    Alert.alert(err.message);
  }
}

export async function WriteWarehouse(data: object) {
  try {
    await AsyncStorage.setItem('@warehouse:Key', JSON.stringify(data));
  } catch (err) {
    Alert.alert(err.message);
  }
}

export async function UpdateCredential(token = "") {
  try {
    const profile = await new Promise((resolve, reject) => {
      Request(
        'get',
        'profile',
        {Authorization: 'Bearer ' + token},
        {},
        [],
        profileRes => resolve(profileRes),
        error => reject(error),
      );
    });

    return {
      status: 'Success',
      data: profile.data,
    };

  } catch (error) {
    return {
      status: 'error',
      data: null,
      message: error,
    };
  }
}


export async function RefershToken(token = "") {
  try {
    const token = await new Promise((resolve, reject) => {
       Request(
        'post',
        'login-form',
        {},
        data,
        [],
        token => resolve(token),
        error => reject(error),
      );
    });

    return {
      status: 'Success',
      data: token.data,
    };

  } catch (error) {
    return {
      status: 'error',
      data: null,
      message: error,
    };
  }
}