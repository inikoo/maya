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
  GlobalScanner,
  Profile,
  ProfileDetail,
  Organisation,
  LoginScanner,
  Fullfilment,
  LocationScanner,
  PalletScanner,
  Deliveries,
  DeliveryDetail,
  Returns,
  ReturnDetail,
  DeliveryScanner,
  ReturnScanner,
  MovePallet,
  Notification,
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
      name: 'Locations',
      component: Locations,
      option: {headerShown: false},
    },
    {
      name: 'Location',
      component: Location,
    },
    {
      name: 'Location Pallet',
      component: LocationPallet,
    },
    {
      name: 'Pallets',
      component: Pallets,
    },
    {
      name: 'Pallet',
      component: Pallet,
    },
    {
      name: 'StoredItems',
      component: StoredItems,
    },
    {
      name: 'Profile Detail',
      component: ProfileDetail,
      option: {headerShown: false},
    },
    {
      name: 'Location Scanner',
      component: LocationScanner,
    },
    {
      name: 'Pallet Scanner',
      component: PalletScanner,
    },
    {
      name: 'Pallet Movement',
      component: MovePallet,
    },
    {
      name: 'Deliveries',
      component: Deliveries,
    },
    {
      name: 'Delivery',
      component: DeliveryDetail,
    },
    {
      name: 'Delivery Scanner',
      component: DeliveryScanner,
    },
    {
      name: 'Returns',
      component: Returns,
    },
    {
      name: 'Return',
      component: ReturnDetail,
    },
    {
      name: 'Notification',
      component: Notification,
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
          component: GlobalScanner,
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
            title: 'Settings',
            headerTitleAlign: 'center', // Menambahkan properti ini untuk mengatur label header di tengah
            headerTitleStyle: {
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: 24,
            },
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
  ],
};
