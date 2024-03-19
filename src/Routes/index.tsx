import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Action from '~/Store/Action';
import {UpdateCredential} from '~/Utils/auth';
import ListRoutes from './RouteList';

const Stack = createNativeStackNavigator();

function Routes() {
  const [userToken, setUserToken] = useState(null);
  const [finalRoutes, setFinalRoutes] = useState(ListRoutes.routes);
  const [BottomNavigatorRoutes, setBottomNavigatorRoutes] = useState(ListRoutes.BottomNavigatorRoutes,);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer)
   
  const checkuser = async () => {
    try {
      const userStorage = await AsyncStorage.getItem('@AuthenticationToken:Key');
      const organisation = await AsyncStorage.getItem('@organisation:Key');
      const warehouse = await AsyncStorage.getItem('@warehouse:Key');
  
      if (!userStorage) setUserToken(null);
      else {
        const data = JSON.parse(userStorage);
        const profile = await UpdateCredential(data.token);
  
        if (profile.status === 'Success' && data.token && !user.hasOwnProperty('token')) {
          dispatch(Action.CreateUserSessionProperties({ ...data, ...profile.data }));
  
          if (organisation){
            dispatch(Action.CreateUserOrganisationProperties(JSON.parse(organisation)));
          } 
          if (warehouse){
            dispatch(Action.CreateWarehouseProperties(JSON.parse(warehouse)));
          }
        }
  
        setUserToken(data);
      }
    } catch (error) {
      console.error('Error fetching credentials from AsyncStorage:', error);
      setUserToken(null);
    } finally {
      setIsLoading(false);
    }
  };
  

  const checkPermissions = async routes => {
    const value = await AsyncStorage.getItem('@AuthenticationToken:Key');
    let final = [];
    if (value) {
      const user = JSON.parse(value);
      for (const route of routes) {
        if (route.permissions) {
          if (route.permissions.some(item => user.permissions.includes(item)))
            final.push(route);
        } else final.push(route);
      }
    } else {
      final = routes;
    }
    setFinalRoutes(final);
  };

  useEffect(() => {
    const fetchData = async () => await checkuser(); 
    fetchData();
  }, [user]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {!userToken ? (
        ListRoutes.loginRoutes.map((item, index) => (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              ...item.options,
            }}
          />
        ))
      ) : (
        <>
          {finalRoutes.map((item, index) => (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{
                ...item.options,
              }}
            />
          ))}
          {BottomNavigatorRoutes.map((item, index) => (
            <Stack.Screen key={index} name={item.name} options={item.option}>
              {props => <BottomNavigation {...props} extraData={{ ...item }} />}
            </Stack.Screen>
          ))}
        </>
      )}
    </Stack.Navigator>
  );
  
}

export default Routes;
