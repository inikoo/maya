import { DashboardFullfilment, GlobalSearch, Deliveries, Locations, Pallets, StoredItems, StoredItemsReturns } from '~/Screens';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faChartNetwork, faSearch, faInventory, faPallet, faTruckCouch, faSignOut, faBox } from 'assets/fa/pro-regular-svg-icons';

library.add(faChartNetwork, faSearch, faInventory, faPallet, faTruckCouch, faSignOut, faBox );

const navigation = [
    {
      name: 'DashboardFullfilment',
      options: { headerShown: false },
      components: [
        {
          name: 'Home',
          component: DashboardFullfilment,
          options: {
            headerShown: false,
            tabBarIcon: faChartNetwork,
            tabBarLabel : 'Dasboard'
          },
        },
        {
          name: 'Search',
          component: GlobalSearch,
          options: {
            tabBarLabel: 'Search',
            headerShown: false,
            tabBarIcon: faSearch,
          },
        },
        {
          name: 'Locations',
          component: Locations,
          options: {
            tabBarLabel: 'Location',
            headerShown: false,
            tabBarIcon: faInventory,
          },
        },
        {
          name: 'Pallets',
          component: Pallets,
          options: {
            tabBarLabel: 'Pallet',
            headerShown: false,
            tabBarIcon: faPallet,
          },
        },
        {
          name: 'Deliveries',
          component: Deliveries,
          options: {
            tabBarLabel: 'Deliveries',
            headerShown: false,
            tabBarIcon: faTruckCouch,
          },
        },
        {
          name: 'Returns',
          component: Deliveries,
          options: {
            tabBarLabel: 'return',
            headerShown: false,
            tabBarIcon: faSignOut,
          },
        },
        {
          name: 'Stored Items',
          component: StoredItems,
          options: {
            tabBarLabel: 'Item',
            headerShown: false,
            tabBarIcon: faBox,
          },
        },
      ],
    },
  
  ]

export { navigation };
