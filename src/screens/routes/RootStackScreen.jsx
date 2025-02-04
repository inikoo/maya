import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import login from '../LoginScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="login" component={login}/>
    </RootStack.Navigator>
);

export default RootStackScreen;