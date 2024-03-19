import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Pressable} from 'react-native';
import {RemoveCredential} from '~/Utils/auth';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Action from '~/Store/Action';

const Profile = () => {
  const dispatch = useDispatch()
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
          dispatch(Action.DestroyUserSessionProperties());
        }}>
        <Text>logout</Text>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
