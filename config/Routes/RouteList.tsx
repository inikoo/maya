import {
  Login,
  Dashboard,
  Warehouse,
  Locations,
  Pallets,
  StoredItems,
  Location,
  LocationPallet,
  Pallet,
  GlobalSearch,
  Profile,
  ProfileDetail,
  Organisation,
  LoginScanner,
  Fullfilment,
  LocationScanner,
  PalletScanner,
  Deliveries,
  DeliveryDetail,
  StoredItemsReturns,
  PalletReturns,
  ReturnDetail,
  DeliveryScanner,
  ReturnScanner,
  Notification,
  DeliveryPallet,
  GlobalScanner,
  SelectOrganisation,
  SelectFullfilment,
  ChangeLocationByScanner
} from '../../src/Screens';
import {Icon} from '@rneui/base';
import ScanButton from '~/Components/MainNavigatorButton';
import {View, Text} from 'react-native';

export default {
  loginRoutes: [
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
  ],

  routes: [
    {
      name: 'Profile Detail',
      component: ProfileDetail,
      option: {headerShown: false},
    },
    {
      name: 'Notification',
      component: Notification,
      option: {headerShown: false},
    },
    {
      name: 'Organisation',
      component: Organisation,
      option: {headerShown: false},
    },
    {
      name: 'Fullfilment',
      component: Fullfilment,
      option: {headerShown: false},
    },
    {
      name: 'Warehouse',
      component: Warehouse,
      option: {headerShown: false},
    },
    {
      name: 'Scanner Global',
      component: GlobalScanner,
      option: {headerShown: false},
    },
    {
      name: 'Select Organisation',
      component: SelectOrganisation,
      option: {headerShown: false},
    },
    {
      name: 'Select fullfilment',
      component: SelectFullfilment,
      option: {headerShown: false},
    },

    {
      name: 'Locations',
      component: Locations,
      option: {headerShown: false},
    },
    {
      name: 'Location',
      component: Location,
      option: {headerShown: false},
    },
    {
      name: 'Location Pallet',
      component: LocationPallet,
      option: {headerShown: false},
    },
    {
      name: 'Location Scanner',
      component: LocationScanner,
      option: {headerShown: false},
    },

    {
      name: 'Pallets',
      component: Pallets,
      option: {headerShown: false},
    },
    {
      name: 'Pallet',
      component: Pallet,
      option: {headerShown: false},
    },
    {
      name: 'Pallet Scanner',
      component: PalletScanner,
      option: {headerShown: false},
    },
    {
      name: 'Change Location Pallet Scanner',
      component: ChangeLocationByScanner,
      option: {headerShown: false},
    },

    {
      name: 'StoredItems',
      component: StoredItems,
    },
   
    {
      name: 'Deliveries',
      component: Deliveries,
      option: {headerShown: false},
    },
    {
      name: 'Delivery',
      component: DeliveryDetail,
      option: {headerShown: false},
    },
    {
      name: 'Delivery Scanner',
      component: DeliveryScanner,
    },
    {
      name: 'Delivery Pallet',
      component: DeliveryPallet,
      option: {headerShown: false},
    },

    {
      name: 'Return',
      component: ReturnDetail,
    },
    {
      name: 'Return Scanner',
      component: ReturnScanner,
    },
  ],

  BottomNavigatorRoutes: [
    {
      name: 'Dashboard',
      option: {headerShown: false},
      components: [
        {
          name: 'Home',
          component: Dashboard,
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
                  <Icon name="home" type="foundation" color={color} size={25} />
                  <Text style={{color: color, fontSize: 12}}>Home</Text>
                </View>
              );
            },
          },
        },
        {
          name: 'Scan',
          component: GlobalSearch,
          renderLabel: () => null,
          labeled: false,
          options: {
            tabBarLabel: '',
            headerShown: false,
            tabBarIcon: ({color = ''}) => (
              <Icon name="qr-code-scanner" color="#ffffff" size={30} />
            ),
            tabBarButton: (props: Object) => <ScanButton {...props} />,
          },
        },
        {
          name: 'Profile',
          component: Profile,
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
                    name="user"
                    type="font-awesome"
                    color={color}
                    size={26}
                  />
                  <Text style={{color: color, fontSize: 12}}>Profile</Text>
                </View>
              );
            },
          },
        },
      ],
    },
    {
      name: 'Returns',
      option: {headerShown: false},
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
  ],
};
