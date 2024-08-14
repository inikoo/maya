import { DashboardProduction, GlobalSearch } from '~/Screens';
import {Icon} from '@rneui/base';
import {View, Text} from 'react-native';
import React from 'react';

const navigation = [
    {
      name: 'DashboardProduction',
      options: { headerShown: false },
      components: [
        {
          name: 'Home Production',
          component: DashboardProduction,
          options: {
            headerShown: false,
            tabBarIcon: ({color}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 3,
                }}>
                <Icon name="home" type="foundation" color={color} size={25} />
                <Text style={{color: color, fontSize: 12}}>Home</Text>
              </View>
            ),
          },
        },
        {
          name: 'Scan',
          component: GlobalSearch,
          options: {
            tabBarLabel: '',
            headerShown: false,
            tabBarIcon:({color}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 3,
                }}>
                <Icon
                  name="search"
                  type="font-awesome"
                  color={color}
                  size={26}
                />
                <Text style={{color: color, fontSize: 12}}>Search</Text>
              </View>
            ),
          },
        },
      ],
    },
  ]

export { navigation };
