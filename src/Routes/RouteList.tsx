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
  GlobalScanner,
  SelectOrganisation,
  SelectFullfilment,

  //profile
  Profile,
  ProfileDetail,

  //fullfilment
  FullfilmentNavigation,

  //fullfilment location
  Locations,
  Location,
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

  //Production
  ProductionNavigation,

  //Inventory
  InventoryDashboard,
  InventoryNavigation,

  //Dispatching
  DispatchingDashboard,

  //Locations
  LocationsDashboard,

  //Procurement
  ProcurementDashboard,
} from '~/Screens';

import { Icon } from '@rneui/themed';
import { View, Text } from 'react-native'
import { MAINCOLORS } from '~/Utils/Colors';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faInventory,
  faPalletAlt,
  faConveyorBeltAlt,
  faHandHoldingBox,
  faBoxUsd,
  faChartLineDown
} from 'assets/fa/pro-regular-svg-icons';
import {FontAwesomeIcon, } from '@fortawesome/react-native-fontawesome';

library.add(faInventory, faPalletAlt, faConveyorBeltAlt, faHandHoldingBox, faBoxUsd, faChartLineDown);

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

const routes = ({ organisation = null, warehouse = null }) => [
  //initial
  {
    name: 'Organisation',
    component: Organisation,
    options: { headerShown: false },
  },
  {
    name: 'Fullfilment',
    component: Fullfilment,
    options: { headerShown: false },
  },
  {
    name: 'Warehouse',
    component: Warehouse,
    options: { headerShown: false },
  },
  {
    name: 'Scanner Global',
    component: GlobalScanner,
    options: { headerShown: false },
  },
  {
    name: 'Select Organisation',
    component: SelectOrganisation,
    options: { headerShown: false },
  },
  {
    name: 'Select fullfilment',
    component: SelectFullfilment,
    options: { headerShown: false },
  },
  {
    name: 'Notification',
    component: Notification,
    options: { headerShown: false },
  },

  //profile
  {
    name: 'Settings',
    component: Profile,
    options: { headerShown: false },
  },
  {
    name: 'Profile Detail',
    component: ProfileDetail,
    options: { headerShown: false },
  },

  //fullfilment locations
  {
    name: 'Locations',
    component: Locations,
    options: { headerShown: false },
  },
  {
    name: 'Location',
    component: Location,
    options: { headerShown: false },
  },
  {
    name: 'Location Pallet',
    component: LocationPallet,
    options: { headerShown: false },
  },
  {
    name: 'Location Scanner',
    component: LocationScanner,
    options: { headerShown: false },
  },

  //fullfillment pallet
  {
    name: 'Pallets',
    component: Pallets,
    options: { headerShown: false },
  },
  {
    name: 'Pallet',
    component: Pallet,
    options: { headerShown: false },
  },
  {
    name: 'Pallet Scanner',
    component: PalletScanner,
    options: { headerShown: false },
  },
  {
    name: 'Change Location Pallet Scanner',
    component: ChangeLocationPalletByScanner,
    options: { headerShown: false },
  },

  //fullfilment deliveries
  {
    name: 'Deliveries',
    component: Deliveries,
    options: { headerShown: false },
  },
  {
    name: 'Delivery',
    component: DeliveryDetail,
    options: { headerShown: false },
  },
  {
    name: 'Delivery Scanner',
    component: DeliveryScanner,
    options: { headerShown: false }, // Added options here for consistency
  },
  {
    name: 'Delivery Pallet',
    component: DeliveryPallet,
    options: { headerShown: false },
  },

  //return pallet
  {
    name: 'Return',
    component: ReturnDetail,
    options: { headerShown: false }, // Added options here for consistency
  },
  {
    name: 'Return Scanner',
    component: ReturnScanner,
    options: { headerShown: false }, // Added options here for consistency
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
          drawerLabel: ({ focused }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <FontAwesomeIcon
                      icon={faChartLineDown}
                      size={20}
                      color={focused ? MAINCOLORS.primary : '#000'}
                    />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: focused ? MAINCOLORS.primary  : '#000', // Set active color here
                }}
              >
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
          drawerLabel: ({ focused }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <FontAwesomeIcon
                      icon={faPalletAlt}
                      size={20}
                      color={focused ? MAINCOLORS.primary : '#000'}
                    />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: focused ? MAINCOLORS.primary  : '#000', // Set active color here
                }}
              >
                Inventory
              </Text>
            </View>
          ),
        },
        permissions: [
          `inventory.${organisation?.id}.view`,
          `inventory.${organisation?.id}`,
        ],
      },
      {
        name: 'Dispatching',
        component: DispatchingDashboard,
        options: {
          headerShown: false,
          drawerLabel: ({ focused }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <FontAwesomeIcon
                      icon={faConveyorBeltAlt}
                      size={20}
                      color={focused ? MAINCOLORS.primary : '#000'}
                    />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: focused ? MAINCOLORS.primary  : '#000', // Set active color here
                }}
              >
                Dispatching
              </Text>
            </View>
          ),
        },
        permissions: [
          `dispatching.${warehouse?.id}.view`,
          `dispatching.${warehouse?.id}`,
        ],
      },
      {
        name: 'Locations',
        component: LocationsDashboard,
        options: {
          headerShown: false,
          drawerLabel: ({ focused }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <FontAwesomeIcon
                      icon={faInventory}
                      size={20}
                      color={focused ? MAINCOLORS.primary : '#000'}
                    />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: focused ? MAINCOLORS.primary  : '#000', // Set active color here
                }}
              >
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
        name: 'Fulfilment',
        component: FullfilmentNavigation,
        options: {
          headerShown: false,
          drawerLabel: ({ focused }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <FontAwesomeIcon
                      icon={faHandHoldingBox}
                      size={20}
                      color={focused ? MAINCOLORS.primary : '#000'}
                    />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: focused ? MAINCOLORS.primary  : '#000', // Set active color here
                }}
              >
                Dispatching
              </Text>
            </View>
          ),
        },
        permissions: [
          `fulfilment.${warehouse?.id}.view`,
          `fulfilment.${warehouse?.id}`,
        ],
      },
      {
        name: 'Procurement',
        component: ProcurementDashboard,
        options: {
          headerShown: false,
          drawerLabel: ({ focused }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <FontAwesomeIcon
                      icon={faBoxUsd}
                      size={20}
                      color={focused ? MAINCOLORS.primary : '#000'}
                    />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  color: focused ? MAINCOLORS.primary  : '#000', // Set active color here
                }}
              >
                Dispatching
              </Text>
            </View>
          ),
        },
        permissions: [
          `procurement.${organisation?.id}.view`,
          `procurement.${organisation?.id}`,
        ],
      },
    ],
  },
];

export { loginRoutes, routes, drawerRoutes };
