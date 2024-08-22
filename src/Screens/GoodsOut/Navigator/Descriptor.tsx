import {GoodsOutDashboard, Pallets, StoredItems, PalletReturns, DeliveryNotes} from '~/Screens';
import {library} from '@fortawesome/fontawesome-svg-core';

import {
  faPallet,
  faBox,
  faChartNetwork,
  faSearch,
  faBoxes,
  faTruck,
  faTruckCouch,
  faSignOut
} from 'assets/fa/pro-regular-svg-icons';

library.add(faBox, faPallet, faChartNetwork, faSearch, faBoxes, faTruck, faTruckCouch, faSignOut);

const navigation = [
  {
    name: 'Dashboard Goods In',
    options: {headerShown: false},
    components: [
      {
        name: 'Home',
        component: GoodsOutDashboard,
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
        name: 'Deliveries Note',
        component: DeliveryNotes,
        options: {
          tabBarLabel: 'Deliveries Note',
          headerShown: false,
          tabBarIcon: faTruck,
        },
      },
      {
        name: 'Fullfilment Return',
        component: PalletReturns,
        options: {
          tabBarLabel: 'Return',
          headerShown: false,
          tabBarIcon:  faSignOut,
        },
      },
      
    ],
  },
];

export {navigation};
