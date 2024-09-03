import React, {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {MAINCOLORS} from '~/Utils/Colors';
import {ActivityIndicator} from 'react-native';

type Props = {
  content: ReactNode;
  postion: Object;
  constainerStyle: Object;
  loading: boolean;
  onPress: Function;
};

const AbsoluteButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={{...props.postion, ...props.constainerStyle}}
      onPress={props.onPress}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        {props.loading ? <ActivityIndicator color={'white'} /> : props.content}
      </View>
    </TouchableOpacity>
  );
};

AbsoluteButton.defaultProps = {
  onPress: () => null,
  postion: {
    bottom: 20,
    left: 280,
  },
  loading: false,
  constainerStyle: {
    backgroundColor: MAINCOLORS.primary,
    height: 80,
    width: 80,
    borderRadius: 35,
  },
  content: <Text>Button</Text>,
};

const styles = StyleSheet.create({});

export default AbsoluteButton;
