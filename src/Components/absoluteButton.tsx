import React, {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {MAINCOLORS} from '~/Utils/Colors';
import {ActivityIndicator} from 'react-native';

type Props = {
  content: ReactNode;
  position: Object;
  containerStyle: Object; // perbaikan typo constainerStyle menjadi containerStyle
  loading: Boolean;
  onPress: Function;
};

const AbsoluteButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={[styles.absolutePosition, props.position, props.containerStyle]} // pastikan menggunakan styles.absolutePosition untuk absolute positioning
      onPress={props.onPress}>
      <View
        style={styles.buttonContent}>
        {props.loading ? <ActivityIndicator color={'white'} /> : props.content}
      </View>
    </TouchableOpacity>
  );
};

AbsoluteButton.defaultProps = {
  onPress: () => null,
  position: {
    bottom: 10, // Set to 20 or any desired distance from bottom
    right: 20, // Set to 20 or any desired distance from right
  },
  loading: false,
  containerStyle: {
    backgroundColor: MAINCOLORS.primary,
    height: 80,
    width: 80,
    borderRadius: 40, // Circle shape
  },
  content: <Text>Button</Text>,
};

const styles = StyleSheet.create({
  absolutePosition: {
    position: 'absolute',
    zIndex: 1000, // Ensures it's on top of other elements
  },
  buttonContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default AbsoluteButton;
