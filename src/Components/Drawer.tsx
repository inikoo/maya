import React, {ReactNode, useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MAINCOLORS} from '~/Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {RemoveCredential} from '~/Utils/auth';
import Action from '~/Store/Action';

type Item = {
  name: String;
  component: ReactNode;
  options: {
    tabBarButton: ReactNode;
  };
};

type props = {
  route: {
    params: string;
  };
  extraData: {
    components: Array<any>;
  };
};

const Drawer = createDrawerNavigator();

export default function DrawerNavigation(props: props) {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      {props.extraData.components.map((item: Item) => {
        return (
          <Drawer.Screen
            {...item}
            key={item.name}
            initialParams={props.route}
          />
        );
      })}
    </Drawer.Navigator>
  );
}

export const CustomDrawer = props => {
  const user = useSelector(state => state.userReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logOut = () => {
    RemoveCredential();
    dispatch(Action.DestroyUserSessionProperties());
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: MAINCOLORS.primary}}>
        <View style={{padding: 20}}>
          <Image
            source={
              user.image
                ? { uri: user.image.original }
                : require('assets/image/profile.png')
            }
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text style={styles.name}>{user.username}</Text>
        </View>
        <View style={{backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="settings-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Settings
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logOut()} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
    color: '#fff',
    paddingHorizontal: 15,
  },
});
