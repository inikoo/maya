import {TouchableOpacity, View} from 'react-native';
import React from 'react';

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
        borderRadius: 50,
        backgroundColor : 'blue'
      }}>
      {children}
    </View>
  </TouchableOpacity>
);


export default ScanButton;
