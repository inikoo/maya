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
} from '~/Screens';

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
const routes = [
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
    component: GlobalScanner,
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
    component: Location,
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
  },
  {
    name: 'Return Scanner',
    component: ReturnScanner,
  },
];
const drawerRoutes = [
  {
    name: 'Main',
    options: {headerShown: false},
    components: [
      {
        name: 'Dashboard',
        component: Dashboard,
        options: {headerShown: false},
      },
      {
        name: 'Fullfilment',
        component: FullfilmentNavigation,
        options: {headerShown: false},
      },
      {
        name: 'Production',
        component: ProductionNavigation,
        options: {headerShown: false},
      },
    ],
  },
];

export {loginRoutes, routes, drawerRoutes};
