import {WriteCredential, UpdateCredential, RemoveCredential} from './auth';
import Request from './request';
import {Dimensions} from 'react-native';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrefixScanner = (prefix : string, value : 'string') => {
  if (value.startsWith(`${prefix}-`)) return true
  return false
};

const FindDimensions = () => {
  return {
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
  };
};

const IconColor = (allow, stock) => {
  if (allow && stock) return MAINCOLORS.success;
  if (!allow && stock) return MAINCOLORS.warning;
  return COLORS.black; // default color if neither allow nor stock
};


const getWarehouse = () => {
  return AsyncStorage.getItem('@warehouse:Key')
    .then((warehouse) => {
      if (warehouse) {
        return JSON.parse(warehouse);
      }
      return null;
    })
    .catch((error) => {
      console.error('Failed to retrieve warehouse:', error);
      return null;
    });
};


const checkPermissionNested = (data : Array, permissions : Array) => {
  let filteredData = [];
  if (permissions && data) {
    filteredData = data.map(item => ({
      ...item,
      components: item.components.filter(component => {
        if (component.permissions) {
          return component.permissions.some(p => {
            return permissions.includes(p);
          });
        }
        return true;
      }),
    }));
  }

  return filteredData;
};

const checkPermission = (data,permissions) =>{
  let filteredData = [];
  if (permissions && data) {
    filteredData =  data.filter(component => {
        if (component.permissions) {
          return component.permissions.some(p => {                       
            return permissions.includes(p);
          });
        }
        return true;
      })
    }

  return filteredData;
}


export {
  WriteCredential,
  UpdateCredential,
  RemoveCredential,
  Request,
  PrefixScanner,
  FindDimensions,
  IconColor,
  getWarehouse,
  checkPermissionNested,
  checkPermission
};
