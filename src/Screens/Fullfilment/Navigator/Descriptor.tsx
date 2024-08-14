import { DashboardFullfilment, GlobalSearch, StoredItemsReturns, PalletReturns } from '~/Screens';
import {Icon} from '@rneui/base';
import {View, Text} from 'react-native';
import React from 'react';

const navigation = [
    {
      name: 'DashboardFullfilment',
      options: { headerShown: false },
      components: [
        {
          name: 'Home',
          component: DashboardFullfilment,
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
    {
      name: 'Returns',
      options: {headerShown: false},
      components: [
        {
          name: 'Pallet Retruns',
          component: PalletReturns,
          options: {
            headerShown: false,
            tabBarIcon: ({color = ''}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 3,
                  }}>
                  <Icon name="pallet" type="font-awesome-5" color={color} size={25} />
                  <Text style={{color: color, fontSize: 12}}>Pallet</Text>
                </View>
              );
            },
          },
        },
        {
          name: 'Stored Items Returns',
          component: StoredItemsReturns,
          options: {
            headerShown: false,
            tabBarIcon: ({color = ''}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 3,
                  }}>
                  <Icon
                    name="box"
                    type="entypo"
                    color={color}
                    size={26}
                  />
                  <Text style={{color: color, fontSize: 12}}>Stored Items</Text>
                </View>
              );
            },
          },
        },
      ],
    },
  ]

export { navigation };
