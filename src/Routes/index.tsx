import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, LoginForm, LoginScanner} from '~/Screens';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login Form">
      <Stack.Screen
        name="Login Form"
        component={LoginForm}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login Scanner"
        component={LoginScanner}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default Routes;
