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
  Notification
} from '../../src/Screens';
import {Icon} from '@rneui/base';
import ScanButton from '~/Components/MainNavigatorButton';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import BorderIcon from '~/Components/BorderIcon';

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
          option: {
            headerShown : false,
            tabBarIcon: ({color}) => {
              return (
                <Icon name="home" type="foundation" color={color} size={26} />
              );
            },
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
              <Icon name="qr-code-scanner" color={COLORS.dark} size={26} />
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
            tabBarIcon: ({color}) => {
              return (
                <Icon name="user" type="font-awesome" color={color} size={26} />
              );
            },
          },
        },
      ],
    },
  ],
};
