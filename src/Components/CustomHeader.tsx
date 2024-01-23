import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {COLORS} from '~/Constant/Color';
import {useNavigation} from '@react-navigation/native';

const CustomHomeHeader = props => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 10,
        width: '100%',
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        {props.children}
      </Text>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Avatar.Icon
          size={30}
          icon="account"
          style={{marginRight: 20, backgroundColor: COLORS.white}}
        />
      </Pressable>
    </View>
  );
};

export default CustomHomeHeader;
