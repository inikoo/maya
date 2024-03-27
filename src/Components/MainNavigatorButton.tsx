import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '~/Utils/Colors';

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
          backgroundColor: COLORS.primary,
          borderWidth: 1,
          borderColor: COLORS.dark,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default ScanButton;
