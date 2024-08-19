import {InventoryDashboard, GlobalSearch, SKU, SKUFamily} from '~/Screens';
import {Icon} from '@rneui/base';
import {View, Text} from 'react-native';
import React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBoxes, faBox} from 'assets/fa/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

library.add(faBox, faBoxes);

const navigation = [
  {
    name: 'DashboardInventory',
    options: {headerShown: false},
    components: [
      {
        name: 'Home',
        component: InventoryDashboard,
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
          tabBarIcon: ({color}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 3,
              }}>
              <Icon name="search" type="font-awesome" color={color} size={26} />
              <Text style={{color: color, fontSize: 12}}>Search</Text>
            </View>
          ),
        },
      },
      {
        name: 'Sku Family',
        component: SKUFamily,
        options: {
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 3,
              }}>
              <FontAwesomeIcon icon={faBoxes} color={color} size={26} />
              <Text style={{color: color, fontSize: 12}}>SKU Family</Text>
            </View>
          ),
        },
      },
      {
        name: 'Sku',
        component: SKU,
        options: {
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 3,
              }}>
              <FontAwesomeIcon icon={faBox} color={color} size={26} />

              <Text style={{color: color, fontSize: 12}}>SKU</Text>
            </View>
          ),
        },
      },
    ],
  },
];

export {navigation};
