import {GoodsInDashboard, Pallets, StoredItems, StockDeliveries, Deliveries } from '~/Screens';
import {library} from '@fortawesome/fontawesome-svg-core';

import {
  faPallet,
  faBox,
  faChartNetwork,
  faSearch,
  faBoxes,
  faTruckContainer,
  faTruckCouch
} from 'assets/fa/pro-regular-svg-icons';

library.add(faBox, faPallet, faChartNetwork, faSearch, faBoxes, faTruckContainer, faTruckCouch);

const navigation = [
  {
    name: 'Dashboard Goods In',
    options: {headerShown: false},
    components: [
      {
        name: 'Home',
        component: GoodsInDashboard,
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
        name: 'Stock Deliveries',
        component: StockDeliveries,
        options: {
          tabBarLabel: 'Stock Deliveries',
          headerShown: false,
          tabBarIcon: faTruckContainer,
        },
      },
      {
        name: 'fullfilment Deliveries',
        component: Deliveries,
        options: {
          tabBarLabel: 'Deliveries',
          headerShown: false,
          tabBarIcon: faTruckCouch,
        },
      },
    ],
  },
];

export {navigation};
