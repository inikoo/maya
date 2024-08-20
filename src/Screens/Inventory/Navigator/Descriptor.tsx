import {InventoryDashboard, GlobalSearch, SKU, SKUFamily} from '~/Screens';
import {library} from '@fortawesome/fontawesome-svg-core';

import {
  faBoxes,
  faBox,
  faChartNetwork,
  faSearch,
} from 'assets/fa/pro-regular-svg-icons';

library.add(faBox, faBoxes, faChartNetwork, faSearch);

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
        name: 'Sku Family',
        component: SKUFamily,
        options: {
          tabBarLabel: 'SKU Family',
          headerShown: false,
          tabBarIcon: faBoxes,
        },
      },
      {
        name: 'Sku',
        component: SKU,
        options: {
          tabBarLabel: 'SKU',
          headerShown: false,
          tabBarIcon: faBox,
        },
      },
    ],
  },
];

export {navigation};
