import React, {useEffect, useState, useCallback} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Action from '~/Store/Action';
import {checkPermissionNested, checkPermission} from '~/Utils';
import {UpdateCredential, RemoveCredential} from '~/Utils/auth';
import {loginRoutes, routes, drawerRoutes} from './RouteList';
import DrawerNavigation from '~/Components/Drawer';
import {isNull} from 'lodash'

const Stack = createNativeStackNavigator();

function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [userStorage, setUserStorage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);
  const organisationRedux = useSelector(state => state.organisationReducer,)?.active_organisation;
  const warehouseRedux = useSelector(state => state.warehouseReducer);
  const [loginRouteList, setLoginRoutesList] = useState(loginRoutes);
  const [drawerRoutesList, setDrawerRoutes] = useState(
      drawerRoutes({
        organisation: organisationRedux,
        warehouse: warehouseRedux,
      })
    )
  const [screenRoutes, setScreenRoutes] = useState(
      routes({organisation: organisationRedux, warehouse: warehouseRedux})
  );

  const checkUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@AuthenticationToken:Key');
      const organisation = await AsyncStorage.getItem('@organisation:Key');
      const warehouse = await AsyncStorage.getItem('@warehouse:Key');

      if (!storedUser) {
        setUserStorage(null);
      } else {
        const data = JSON.parse(storedUser);
        const profile = await UpdateCredential(data.token);
        

        if (profile.status === 'Success' && data.token) {
          if (!user.token) {
            dispatch(
              Action.CreateUserSessionProperties({...data, ...profile.data}),
            );
            if (organisation)
              dispatch(
                Action.CreateUserOrganisationProperties(
                  JSON.parse(organisation),
                ),
              );
            if (warehouse)
              dispatch(Action.CreateWarehouseProperties(JSON.parse(warehouse)));
          }
          setUserStorage(data);
        } else {
          setUserStorage(null);
          try {
            await RemoveCredential(); 
            dispatch(Action.DestroyUserSessionProperties());
          } catch (error) {
            console.error('Error during logout:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching credentials from AsyncStorage:', error);
      setUserStorage(null);
      try {
        await RemoveCredential(); 
        dispatch(Action.DestroyUserSessionProperties());
      } catch (error) {
        console.error('Error during logout:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Update routes whenever user, organisationRedux, or warehouseRedux changes
  useEffect(() => {
    if (user && organisationRedux && warehouseRedux) {
      setDrawerRoutes(
        checkPermissionNested(
          drawerRoutes({
            organisation: organisationRedux,
            warehouse: warehouseRedux,
          }),
          user.permissions,
        ),
      );
      setScreenRoutes(
        checkPermission(
          routes({organisation: organisationRedux, warehouse: warehouseRedux}),
          user.permissions,
        ),
      );
    }
  }, [organisationRedux,warehouseRedux]);

  useEffect(() => {
    setIsLoading(true)
    checkUser();
  }, [user]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {!userStorage  ?  (
        loginRouteList.map((item, index) => (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{...item.options}}
          />
        ))
      ) : (
        <>
          {drawerRoutesList.map((item, index) => (
            <Stack.Screen
              key={item.name}
              name={item.name}
              options={item.options}>
              {props => <DrawerNavigation {...props} extraData={{...item}} />}
            </Stack.Screen>
          ))}
          {screenRoutes.map((item, index) => (
            <Stack.Screen
              key={item.name}
              name={item.name}
              component={item.component}
              options={{...item.options}}
            />
          ))}
        </>
      )}
    </Stack.Navigator>
  );
}

export default Routes;
