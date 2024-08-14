import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dashboard, FullfilmentNavigation} from '../Screens';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
      />
      <Drawer.Screen 
        name="Fullfilment" 
        component={FullfilmentNavigation} 
      />
    </Drawer.Navigator>
  );
}
