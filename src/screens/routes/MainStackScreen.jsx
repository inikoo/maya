import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import CustomDrawer from '@/src/components/CustomDrawer';

import Home from '@/src/screens/Home';
import InventoryStackScreen from '@/src/screens/routes/InventoryStackScreen';
import GoodsInStackScreen from '@/src/screens/routes/GoodsInStackScreen';
import GoodsOutStackScreen from '@/src/screens/routes/GoodsOutStackScreen';
import LocationStackScreen from '@/src/screens/routes/LocationStackScreen';
import Settings from '@/src/screens/Settings';
import Organisation from '@/src/screens/Organisation';
import Fulfilment from '@/src/screens/Fulfilment';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faPalletAlt,
  faInventory,
  faArrowToBottom,
  faArrowFromLeft,
} from '@/private/fa/pro-regular-svg-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#fff',
        drawerActiveTintColor: '#4F46E5',
        drawerInactiveTintColor: '#333',
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={faHome} size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Inventory"
        component={InventoryStackScreen}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={faInventory} size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Location"
        component={LocationStackScreen}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={faPalletAlt} size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Goods In"
        component={GoodsInStackScreen}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={faArrowToBottom} size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Goods Out"
        component={GoodsOutStackScreen}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon icon={faArrowFromLeft} size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home-drawer" component={DrawerNavigator} />
      <Stack.Screen name="setting" component={Settings} />
      <Stack.Screen
        name="organisation"
        component={Organisation}
        options={{
          headerShown: true,
          title : 'Organisation'
        }}
      />
      <Stack.Screen
        name="fulfilment"
        component={Fulfilment}
        options={{
          headerShown: true,
          title : 'Fulfilment'
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
