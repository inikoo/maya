import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Pressable} from 'react-native';
import {RemoveCredential} from '~/Utils/auth';
import {useNavigation} from '@react-navigation/native';


const Profile = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => {
          RemoveCredential();
          navigation.navigate('Login Form');
        }}>
        <Text>logout</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
