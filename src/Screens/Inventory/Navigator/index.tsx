import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigation} from '~/Screens/Inventory/Navigator/Descriptor';
import BottomNavigation from '~/Components/BottomNavigator';

const Stack = createNativeStackNavigator();

function RoutesFullfilment() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {navigation.map((item, index) => (
        <Stack.Screen
          key={item.name}
          name={item.name}
          options={{...item.options }}>
          {props => <BottomNavigation {...props} extraData={{...item}} />}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  );
}

export default RoutesFullfilment;
