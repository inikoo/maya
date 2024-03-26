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
  PalletScanner
} from '../../src/Screens';
import {Icon} from '@rneui/base';
import ScanButton from '../../src/Components/MainNavigatorButton';

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
      name: 'Warehouse',
      component: Warehouse,
    },
    {
      name: 'Locations',
      component: Locations,
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
    },
    {
      name: 'Organisation',
      component: Organisation,
    },
    {
      name: 'Fullfilment',
      component: Fullfilment,
    },
    {
      name: 'Location Scanner',
      component: LocationScanner,
    },
    {
      name: 'Pallet Scanner',
      component: PalletScanner,
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
          option: {
            tabBarIcon: ({color}) => (
              <Icon name="home" color={color} size={26} />
            ),
          },
        },
        {
          name: 'Scan',
          component: GlobalScanner,
          renderLabel: () => null,
          labeled: false,
          option: {
            tabBarLabel: '',
            headerShown: false,
            tabBarIcon: ({color}) => (
              <Icon name="qr-code-scanner"  color={color} size={26} />
            ),
            tabBarButton: props => (
              <ScanButton children={props.children} onPress={props.onPress} />
            ),
          },
        },
        {
          name: 'Profile',
          component: Profile,
          option: {
            tabBarIcon: ({color}) => (
              <Icon name="user" type='font-awesome' color={color} size={26} />
            ),
          },
        },
      ],
    },
  ],
};
