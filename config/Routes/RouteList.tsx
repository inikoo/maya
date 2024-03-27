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
} from '../../src/Screens';
import {Icon} from '@rneui/base';
import ScanButton from '~/Components/MainNavigatorButton';
import {COLORS} from '~/Utils/Colors';
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
            tabBarIcon: ({color}) => {
              return color == COLORS.primary ? (
                <BorderIcon
                  name="home"
                  type="foundation"
                  size={26}
                  color={color}
                  shadowPos={{top: 4, left: 0}}
                />
              ) : (
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
              return color == COLORS.primary ? (
                <BorderIcon
                  name="user"
                  type="font-awesome"
                  size={26}
                  color={color}
                  shadowPos={{top: 3, left: 4}}
                />
              ) : (
                <Icon name="user" type="font-awesome" color={color} size={26} />
              );
            },
          },
        },
      ],
    },
  ],
};
