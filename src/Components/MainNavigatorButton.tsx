import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '~/Constant/Color';

const ScanButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 60,
        height: 60,
        paddingTop: 12,
        borderRadius: 35,
        backgroundColor: COLORS.primary,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);


export default ScanButton;
