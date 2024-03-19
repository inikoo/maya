import { Login, Dashboard, Warehouse, Locations, Pallets, StoredItems, Location, LocationPallet, Pallet } from '../../src/Screens';
/* import CustomHomeHeader from '~/Components/CustomHeader'; */
/* import {COLORS} from '~/Constant/Color'; */

export default {
  
  loginRoutes: [
    {
      name: 'Login',
      component: Login,
      options: {
        headerShown: false,
      },
    },
  ],

  routes: [
    {
      name: 'Dashboard',
      component: Dashboard,
    },
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
  ],

  BottomNavigatorRoutes: [
    {
      name: 'locations',
      option: {headerShown: false},
      components: [
        {
          name: 'Locations',
          component: Locations,
        },
      ],
    },
  ],

};
