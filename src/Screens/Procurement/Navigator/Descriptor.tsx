import {ProcurementDashboard, GlobalSearch, Agents, Suppliers, Patners,PurchasedOrder } from '~/Screens';
import {library} from '@fortawesome/fontawesome-svg-core';

import {faBox, faChartNetwork, faPeopleArrows, faPersonDolly, faClipboardList, faSearch } from 'assets/fa/pro-regular-svg-icons';

library.add(faBox, faPeopleArrows, faChartNetwork, faPersonDolly,faClipboardList);

const navigation = [
  {
    name: 'DashboardProcurement',
    options: {headerShown: false},
    components: [
      {
        name: 'Dashboard',
        component: ProcurementDashboard,
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
        name: 'Agents',
        component: Agents,
        options: {
          headerShown: false,
          tabBarIcon: faPeopleArrows,
          tabBarLabel : "Agents"
        },
      },
      {
        name: 'Suppliers',
        component: Suppliers,
        options: {
          headerShown: false,
          tabBarIcon: faPersonDolly,
          tabBarLabel : "Suppliers"
        },
      },
      {
        name: 'Patners',
        component: Patners,
        options: {
          headerShown: false,
          tabBarIcon: faPersonDolly,
          tabBarLabel : "Patners"
        },
      },
      {
        name: 'Purchased Orders',
        component: PurchasedOrder,
        options: {
          tabBarLabel: 'Purchase Order',
          headerShown: false,
          tabBarIcon: faClipboardList
        },
      },
    ],
  },
];

export {navigation};
