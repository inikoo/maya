import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS,MAINCOLORS} from '~/Utils/Colors';

const ScanButton = ({children, onPress}) => {
  return (
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
          backgroundColor: MAINCOLORS.warning,
      /*     borderWidth: 2,
          borderColor: MAINCOLORS.white, */
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default ScanButton;
