import React, {ReactNode, useState} from 'react';
import {Text, Button as Base} from '@rneui/base';
import {View, StyleSheet} from 'react-native';
import {MAINCOLORS} from '~/Utils/Colors';

type Props = {
  title?: ReactNode;
  type?: String;
  loading?: Boolean;
  styleContainer?: Object;
  titleStyle?: Object;
  onPress?: Function;
  size?: 'sm' | 'md' | 'lg';
  iconRight?: Boolean;
  icon?: ReactNode;
};

const Button = (props: Props) => {
  return (
    <Base
      iconRight
      buttonStyle={[styles[props.type], props.styleContainer]}
      onPress={props.onPress}
      loading={props.loading}
      title={<Text style={TextStyles[props.type]}>{props.title}</Text>}
      titleStyle={props.titleStyle}
      size={props.size}
      type="solid"
    />
  );
};

Button.defaultProps = {
  title: '',
  type: 'primary',
  loading: false,
  onPress: () => null,
  size: 'lg',
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: MAINCOLORS.primary,
    borderRadius: 10,
    padding: 10,
  },
  secondary: {
    backgroundColor: MAINCOLORS.white,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
});

const TextStyles = StyleSheet.create({
  primary: {
    color: '#ffffff',
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 18,
  },

  secondary: {
    color: 'black',
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default Button;
