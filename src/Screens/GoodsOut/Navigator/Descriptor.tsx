import {GoodsOutDashboard, Pallets, StoredItems, Returns, DeliveryNotes} from '~/Screens';
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
        component: Returns,
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
