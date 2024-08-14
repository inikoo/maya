import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from '@rneui/base';
import { MAINCOLORS } from '~/Utils/Colors';
import LoginSVG from '../../assets/image/20945971.jpg';
import { useNavigation } from '@react-navigation/native';
import Layout from '~/Components/Layout';

export default function SetUpFullfilment() {
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
              color: '#333',
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
              color: '#666',
              marginBottom: 20,
              textAlign: 'center',
              paddingHorizontal: 20,
            }}
          >
            To get started, you need to set up your Fulfillment. Fulfillment is a crucial part of ensuring that your customers receive their orders efficiently and on time. Let's make things organized and efficient!
          </Text>
          <Button
            onPress={() => navigation.navigate('Fullfilment')}
            buttonStyle={{
              backgroundColor: MAINCOLORS.primary,
              padding: 15,
              borderRadius: 10,
              marginBottom: 30,
            }}
            title="Start Fulfillment Setup"
          />
        </View>
      </View>
    </Layout>
  );
}
