import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
/* import {Home, WorkingPlace, Attendence, ClockingMachine} from '~/Screens'; */
import React from 'react';
import { COLORS } from '../../src/Utils/Colors';

function BottomMenu(p) {
  const Tab = createBottomTabNavigator();


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
      }}>
      {p.extraData.components.map((item, index) => (
        <Tab.Screen
          key={item.name}
          {...item}
          name={item.name}
          component={item.component}
          options={{...item.option}}
          initialParams={{...p.route.params}}
        />
      ))}
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomMenu;
