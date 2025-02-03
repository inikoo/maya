import React, { useEffect, useReducer, useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';
import LoginScreen from '@/src/components/screens/LoginScreen';
import Home from '@/src/components/screens/Home';
import RootStackScreen from '@/src/components/screens/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '@/src/utils/AsyncStorage';
import { AuthContext } from '@/src/components/Context/context';
import { loginReducer } from '@/src/Reducer/loginReducer';
import './global.css';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const initialLoginState = {
    isLoading: true,
    userData: null,
    userToken: null,
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (user) => {
        try {
          await AsyncStorage.setItem('persist:user', JSON.stringify(user));
        } catch (e) {
          console.log('Error storing token:', e);
        }
        dispatch({ type: 'LOGIN', user, token: user.token, userData: user });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('persist:user');
        } catch (e) {
          console.log('Error removing token:', e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      userData: loginState,
    }),
    []
  );

  useEffect(() => {
    const loadUserToken = async () => {
      try {
        const storedUser = await getData('persist:user');
        const userToken = storedUser ? storedUser.token : null;
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, userData: storedUser });
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    loadUserToken();
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GluestackUIProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </GluestackUIProvider>
  );
}

export default App;
