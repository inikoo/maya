import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Action from '../../src/Store/Action';
import {UpdateCredential} from '~/Utils/auth';
import ListRoutes from './RouteList';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator();

function Routes() {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);

  const checkuser = async () => {
    try {
      const userStorage = await AsyncStorage.getItem(
        '@AuthenticationToken:Key',
      );
      const organisation = await AsyncStorage.getItem('@organisation:Key');
      const warehouse = await AsyncStorage.getItem('@warehouse:Key');

      if (!userStorage) setUserToken(null);
      else {
        const data = JSON.parse(userStorage);
        const profile = await UpdateCredential(data.token);

        if (
          profile.status === 'Success' &&
          data.token &&
          !user.hasOwnProperty('token')
        ) {
          dispatch(
            Action.CreateUserSessionProperties({...data, ...profile.data}),
          );

          if (organisation) {
            dispatch(
              Action.CreateUserOrganisationProperties(JSON.parse(organisation)),
            );
          }
          if (warehouse) {
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
          {ListRoutes.BottomNavigatorRoutes.map((item, index) => {
            return (
              <Stack.Screen key={index} name={item.name} options={item.option}>
                {props => <BottomNavigation {...props} extraData={{...item}} />}
              </Stack.Screen>
            );
          })}

          {ListRoutes.routes.map((item, index) => (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{
                ...item.options,
              }}
            />
          ))}
        </>
      )}
    </Stack.Navigator>
  );
}

export default Routes;
