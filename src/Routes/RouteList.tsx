import React from 'react';
import {
  //auth
  Login,
  LoginScanner,

  //initial
  Dashboard,
  Notification,
  Organisation,
  Fullfilment,
  Warehouse,
  GlobalSearch,
  SelectOrganisation,
  SelectFullfilment,

  //profile
  Profile,
  ProfileDetail,

  //fullfilment location
  Locations,
  LocationInFulfilment,
  LocationPallet,
  LocationScanner,

  //fullfillment pallet
  Pallets,
  Pallet,
  PalletScanner,
  ChangeLocationPalletByScanner,

  // deliveries
  Deliveries,
  DeliveryDetail,
  DeliveryPallet,
  DeliveryScanner,

  // return pallet
  ReturnDetail,
  ReturnScanner,

  //Inventory
  InventoryNavigation,

  //Locations
  LocationsNavigation,

  //GoodsIn
  GoodsInNavigation,

  //GoodsOut
  GoodsOutNavigation,
} from '~/Screens';

import {Icon} from '@rneui/themed';
import {View, Text} from 'react-native';
import {MAINCOLORS} from '~/Utils/Colors';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faInventory,
  faPalletAlt,
  faConveyorBeltAlt,
  faHandHoldingBox,
  faBoxUsd,
  faChartLineDown,
  faArrowToBottom,
  faArrowFromLeft,
} from 'assets/fa/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

library.add(
  faInventory,
  faPalletAlt,
  faConveyorBeltAlt,
  faHandHoldingBox,
  faBoxUsd,
  faChartLineDown,
  faArrowFromLeft,
  faArrowToBottom,
);

const loginRoutes = [
  {
    name: 'Login',
    component: Login,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Login Scanner',
    component: LoginScanner,
    options: {
      headerShown: false,
    },
  },
];

const routes = ({organisation = null, warehouse = null}) => [
  //initial
  {
    name: 'Organisation',
    component: Organisation,
    options: {headerShown: false},
  },
  {
    name: 'Fullfilment',
    component: Fullfilment,
    options: {headerShown: false},
  },
  {
    name: 'Warehouse',
    component: Warehouse,
    options: {headerShown: false},
  },
  {
    name: 'Scanner Global',
    component: GlobalSearch,
    options: {headerShown: false},
  },
  {
    name: 'Select Organisation',
    component: SelectOrganisation,
    options: {headerShown: false},
  },
  {
    name: 'Select fullfilment',
    component: SelectFullfilment,
    options: {headerShown: false},
  },
  {
    name: 'Notification',
    component: Notification,
    options: {headerShown: false},
  },

  //profile
  {
    name: 'Settings',
    component: Profile,
    options: {headerShown: false},
  },
  {
    name: 'Profile Detail',
    component: ProfileDetail,
    options: {headerShown: false},
  },

  //fullfilment locations
  {
    name: 'Locations',
    component: Locations,
    options: {headerShown: false},
  },
  {
    name: 'Location',
    component: LocationInFulfilment,
    options: {headerShown: false},
  },
  {
    name: 'Location Pallet',
    component: LocationPallet,
    options: {headerShown: false},
  },
  {
    name: 'Location Scanner',
    component: LocationScanner,
    options: {headerShown: false},
  },

  //fullfillment pallet
  {
    name: 'Pallets',
    component: Pallets,
    options: {headerShown: false},
  },
  {
    name: 'Pallet',
    component: Pallet,
    options: {headerShown: false},
  },
  {
    name: 'Pallet Scanner',
    component: PalletScanner,
    options: {headerShown: false},
  },
  {
    name: 'Change Location Pallet Scanner',
    component: ChangeLocationPalletByScanner,
    options: {headerShown: false},
  },

  //fullfilment deliveries
  {
    name: 'Deliveries',
    component: Deliveries,
    options: {headerShown: false},
  },
  {
    name: 'Delivery',
    component: DeliveryDetail,
    options: {headerShown: false},
  },
  {
    name: 'Delivery Scanner',
    component: DeliveryScanner,
    options: {headerShown: false}, // Added options here for consistency
  },
  {
    name: 'Delivery Pallet',
    component: DeliveryPallet,
    options: {headerShown: false},
  },

  //return pallet
  {
    name: 'Return',
    component: ReturnDetail,
    options: {headerShown: false}, // Added options here for consistency
  },
  {
    name: 'Return Scanner',
    component: ReturnScanner,
    options: {headerShown: false}, // Added options here for consistency
  },
];

const drawerRoutes = ({organisation = null, warehouse = null}) => [
  {
    name: 'Main',
    options: {
      headerShown: false,
    },
    components: [
      {
        name: 'Dashboard',
        component: Dashboard,
        options: {
          headerShown: false,
          drawerLabel: ({focused}) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon
                icon={faChartLineDown}
                size={20}
                color={focused ? MAINCOLORS.primary : '#000'}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: focused ? MAINCOLORS.primary : '#000', // Set active color here
                }}>
                Dashboard
              </Text>
            </View>
          ),
        },
      },
      {
        name: 'Inventory',
        component: InventoryNavigation,
        options: {
          headerShown: false,
          drawerLabel: ({focused}) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon
                icon={faPalletAlt}
                size={20}
                color={focused ? MAINCOLORS.primary : '#000'}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: focused ? MAINCOLORS.primary : '#000', // Set active color here
                }}>
                Inventory
              </Text>
            </View>
          ),
        },
        permissions: [
          `inventory.${organisation?.id}.view`,
          `inventory.${organisation?.id}`,
          `stocks.${warehouse?.id}.view`,
          `stocks.${warehouse?.id}`
        ],
      },
      {
        name: 'Locations',
        component: LocationsNavigation,
        options: {
          headerShown: false,
          drawerLabel: ({focused}) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon
                icon={faInventory}
                size={20}
                color={focused ? MAINCOLORS.primary : '#000'}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: focused ? MAINCOLORS.primary : '#000', // Set active color here
                }}>
                Locations
              </Text>
            </View>
          ),
        },
        permissions: [
          `locations.${warehouse?.id}.view`,
          `locations.${warehouse?.id}`,
        ],
      },
      {
        name: 'Goods In',
        component: GoodsInNavigation,
        options: {
          headerShown: false,
          drawerLabel: ({focused}) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon
                icon={faArrowToBottom}
                size={20}
                color={focused ? MAINCOLORS.primary : '#000'}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: focused ? MAINCOLORS.primary : '#000', // Set active color here
                }}>
                Goods In
              </Text>
            </View>
          ),
        },
        permissions: [
          `incoming.${warehouse?.id}.view`,
          `incoming.${warehouse?.id}`,
          `fulfilment.${warehouse?.id}.view`,
          `fulfilment.${warehouse?.id}`,
        ],
      },
      {
        name: 'Goods Out',
        component: GoodsOutNavigation,
        options: {
          headerShown: false,
          drawerLabel: ({focused}) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon
                icon={faArrowFromLeft}
                size={20}
                color={focused ? MAINCOLORS.primary : '#000'}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: focused ? MAINCOLORS.primary : '#000', // Set active color here
                }}>
                Goods Out
              </Text>
            </View>
          ),
        },
        permissions: [
          `dispatching.${warehouse?.id}.view`,
          `dispatching.${warehouse?.id}`,
          `fulfilment.${warehouse?.id}.view`,
          `fulfilment.${warehouse?.id}`,
        ],
      },
    ],
  },
];

export {loginRoutes, routes, drawerRoutes};
