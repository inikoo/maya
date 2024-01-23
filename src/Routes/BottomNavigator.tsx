import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import {Home, WorkingPlace, Attendence, ClockingMachine} from '~/Screens';
import React from 'react';
import {COLORS} from '~/Constant/Color';

const BottomMenu = p => {
  console.log('props', p);
  const Tab = createBottomTabNavigator();

  const ScanButton = ({children, onPress}) => (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          width: 60,
          height: 60,
          paddingTop: 12,
          borderRadius: 35,
          backgroundColor: COLORS.yellow,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerStyle: {
          backgroundColor: COLORS.bgColor,
        },
        tabBarStyle: {
          bottom: 10,
          left: 0,
          height: 60,
          right: 0,
          borderRadius: 32,
          paddingBottom: 12,
          marginHorizontal: 10,
          marginTop: 20,
          paddingTop: 12,
          backgroundColor: COLORS.bgColor,
          ...style.shadow,
        },
      }}>
      {p.extraData.components.map((item, index) => (
        <Tab.Screen
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
