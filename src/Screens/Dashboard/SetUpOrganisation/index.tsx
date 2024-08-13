import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';

import {Button} from '@rneui/base';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import LoginSVG from '../../../assets/image/20943993.jpg';
import {useNavigation} from '@react-navigation/native';
import Layout from '~/Components/Layout';

export default function SetUpOrganisation() {
  const navigation = useNavigation();
  return (
    <Layout>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={LoginSVG}
          style={{
            height: 300,
            width: 300,
          }}
        />
      </View>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 24,
            fontWeight: 'bold',
       
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Welcome to Our Services!
        </Text>

        <Text
          style={{
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            fontWeight: '400',
      
            marginBottom: 20,
            textAlign: 'center',
            paddingHorizontal: 20,
          }}
        >
          To get started, you need to set up your Organisation. organisation is a crucial part of ensuring that your customers receive their orders efficiently and on time. Let's make things organized and efficient!
        </Text>
        <Button
          onPress={() => navigation.navigate('Organisation')}
          buttonStyle={{
            backgroundColor: MAINCOLORS.primary,
            padding: 15,
            borderRadius: 10,
            marginBottom: 30,
          }}
          title="Start Organisation Setup"
        />
      </View>
    </View>
  </Layout>
  );
}
