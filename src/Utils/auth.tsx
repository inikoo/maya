import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import Action from '../store/Action';
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

export async function UpdateCredential(token: object) {
  try {
    const profile = await new Promise((resolve, reject) => {
      Request(
        'get',
        'profile',
        {Authorization: 'Bearer ' + token},
        {},
        [],
        profileRes => {
          resolve(profileRes);
        },
        err => {
          console.error(err);
          reject(err);
        },
      );
    });

    /* const warehouse = await new Promise((resolve, reject) => {
      Request(
        'get',
        'warehouse-index',
        {Authorization: 'Bearer ' + token},
        {},
        [profile.data.organisations[0].id],
        warehouseRes => {
          resolve(warehouseRes);
        },
        err => {
          console.error(err);
          reject(err);
        },
      );
    }); */

    return {
      status: 'Success',
      data: {
        ...profile.data,
        group: profile.data.group,
        organisations: profile.data.organisations,
      /*   warehouse: warehouse.data, */
      },
    };
  } catch (err) {
    console.error(err);
    return {status: 'error', data: null};
  }
}

export async function RemoveCredential() {
  try {
    await AsyncStorage.removeItem('@AuthenticationToken:Key');
  } catch (err) {
    Alert.alert(err.message);
  }
}
