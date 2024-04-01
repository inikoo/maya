import React from 'react';
import {View} from 'react-native';
import {COLORS,MAINCOLORS} from '~/Utils/Colors';
import {Icon} from '@rneui/themed';

export default function BorderIcons(props) {
  return (
    <View style={{position: 'relative'}}>
      <Icon
        name={props.name}
        type={props.type}
        color={props.borderColor}
        size={props.size + 5}
      />
      <View style={{position: 'absolute', ...props.shadowPos}}>
        <Icon
          name={props.name}
          type={props.type}
          color={props.color}
          size={props.size}
        />
      </View>
    </View>
  );
}

BorderIcons.defaultProps = {
  name: '',
  type: 'antdesign',
  size: 10,
  color: MAINCOLORS.primary,
  borderColor: COLORS.grey7,
  shadowPos: {
    top: 0,
    left: 10,
  },
};
