import {InventoryDashboard, GlobalSearch, Pallets, StoredItems, OrgStocks} from '~/Screens';
import {library} from '@fortawesome/fontawesome-svg-core';

import {
  faPallet,
  faBox,
  faChartNetwork,
  faSearch,
  faBoxes
} from 'assets/fa/pro-regular-svg-icons';

library.add(faBox, faPallet, faChartNetwork, faSearch, faBoxes);

const navigation = [
  {
    name: 'DashboardInventory',
    options: {headerShown: false},
    components: [
      {
        name: 'Home',
        component: InventoryDashboard,
        options: {
          headerShown: false,
          tabBarIcon: faChartNetwork,
          tabBarLabel: 'Dasboard',
        },
      },
     /*  {
        name: 'Search',
        component: GlobalSearch,
        options: {
          tabBarLabel: 'Search',
          headerShown: false,
          tabBarIcon: faSearch,
        },
      }, */
      {
        name: 'Org Stocks',
        component: OrgStocks,
        options: {
          tabBarLabel: 'Org Stocks',
          headerShown: false,
          tabBarIcon: faBoxes,
        },
      },
      {
        name: 'Pallets',
        component: Pallets,
        options: {
          tabBarLabel: 'Pallets',
          headerShown: false,
          tabBarIcon: faPallet,
        },
      },
      {
        name: 'Stored Item',
        component: StoredItems,
        options: {
          tabBarLabel: 'Stored Item',
          headerShown: false,
          tabBarIcon: faBox,
        },
      },
    ],
  },
];

export {navigation};
