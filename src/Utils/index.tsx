import {WriteCredential, UpdateCredential, RemoveCredential} from './auth';
import Request from './request';
import {Dimensions} from 'react-native';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';

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

export {
  WriteCredential,
  UpdateCredential,
  RemoveCredential,
  Request,
  PrefixScanner,
  FindDimensions,
  IconColor
};
