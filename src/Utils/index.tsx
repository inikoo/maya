import {WriteCredential, UpdateCredential, RemoveCredential} from './auth';
import Request from './request';
import {Dimensions} from 'react-native';

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

export {
  WriteCredential,
  UpdateCredential,
  RemoveCredential,
  Request,
  PrefixScanner,
  FindDimensions,
};
