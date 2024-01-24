import {
  LoginForm,
  LoginScanner,
  Attendence,
  ClockingMachine,
  WorkingPlace,
  Home,
  Profile,
  Warehaouse,
  Locations,
  ScannerLoacation
} from '~/Screens';
import {Icon} from 'react-native-paper';
import ScanButton from '~/Components/MainNavigatorButton';
import CustomHomeHeader from '~/Components/CustomHeader';
import {COLORS} from '~/Constant/Color';

export default {
  routes: [
    {
      name: 'Login Form',
      component: LoginForm,
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
    {
      name: 'Home',
      component: Home,
      options: {
        headerStyle: {
          height: 164,
          backgroundColor: COLORS.primary,
        },
        headerTitle: (props: object) => <CustomHomeHeader {...props} />,
      },
    },
    {
      name: 'Profile',
      component: Profile,
      options: {
        headerStyle: {
          height: 164,
          backgroundColor: COLORS.primary,
        },
        headerTitle: (props: object) => <CustomHomeHeader {...props} />,
      },
    },
    {
      name: 'Warehouse',
      component: Warehaouse,
      options: {
        headerStyle: {
          height: 164,
          backgroundColor: COLORS.primary,
        },
        headerTitle: (props: object) => <CustomHomeHeader {...props} />,
      },
    },
    /* {
      name: 'Locations',
      component: Locations,
      options: {
        headerStyle: {
          height: 164,
          backgroundColor: COLORS.primary,
        },
        headerTitle: (props: object) => <CustomHomeHeader {...props} />,
      },
    }, */
  ],

  BottomNavigatorRoutes: [
    {
      name: 'locations',
      option: {headerShown: false},
      components: [
        {
          name: 'Locations',
          component: Locations,
          option: {
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerShown: true,
            tabBarIcon: ({color}) => (
              <Icon source="google-maps" color={color} size={26} />
            ),
          },
        },
        {
          name: 'Scan Locations',
          component: ScannerLoacation,
          option: {
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerShown: true,
            tabBarIcon: ({color}) => (
              <Icon source="barcode-scan" color={color} size={26} />
            ),
          },
        },
      ],
    },
  ],

  /*  BottomNavigatorRoutes: [
    {
      name: "Bottom Navigation",
      option: {headerShown: false},
      components: [
        {
          name: 'Home',
          component: Home,
          option: {
            headerShown: false,
            tabBarIcon: ({color}) => (
              <Icon source="home" color={color} size={26} />
            ),
          },
        },
        {
          name: 'Clocking Machine',
          component: ClockingMachine,
          renderLabel : ()=>null,
          labeled : false,
          option: { */
  /* tabBarLabel: '', */
  /*  headerShown: false,
            tabBarIcon: ({color}) => (
              <Icon source="home" color={color} size={26} />
            ), */
  /*   tabBarButton: (props) => (
              <ScanButton children={props.children} onPress={props.onPress} />
            ), */
  /*   },
        },
        {
          name: 'Profile',
          component: WorkingPlace,
          option: {
            headerShown: true,
            tabBarIcon: ({color}) => (
              <Icon source="account" color={color} size={26} />
            ),
          },
        },
      ], */
};
