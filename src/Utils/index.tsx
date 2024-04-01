import {WriteCredential, UpdateCredential, RemoveCredential} from './auth';
import Request from './request';
import {Dimensions} from 'react-native';

const PrefixScanner = e => {
  let dataWithoutPrefix;

  if (e.startsWith('loc-')) {
    dataWithoutPrefix = e.substring(4);
  } else if (e.startsWith('pal-')) {
    dataWithoutPrefix = e.substring(4);
  } else if (e.startsWith('item-')) {
    dataWithoutPrefix = e.substring(5);
  } else {
    dataWithoutPrefix = e;
  }

  return dataWithoutPrefix;
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
