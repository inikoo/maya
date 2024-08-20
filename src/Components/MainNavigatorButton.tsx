import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import { MAINCOLORS } from '~/Utils/Colors';

const ScanButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={[styles.touchable, styles.shadow]} onPress={onPress}>
      <LinearGradient
        colors={[MAINCOLORS.primary, '#ff6f00']} // Set gradient colors
        style={[styles.button, styles.shadow]} // Apply gradient style
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000', // Warna bayangan diubah ke hitam
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // untuk Android
  },
});

export default ScanButton;
