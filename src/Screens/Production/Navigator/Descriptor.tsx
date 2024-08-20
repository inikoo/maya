import { DashboardProduction, GlobalSearch } from '~/Screens';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSearch, faChartNetwork, } from 'assets/fa/pro-regular-svg-icons';

library.add(faChartNetwork);

const navigation = [
    {
      name: 'DashboardProduction',
      options: { headerShown: false },
      components: [
        {
          name: 'Home Production',
          component: DashboardProduction,
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
            headerShown: false,
            tabBarIcon: faSearch,
            tabBarLabel : 'Search'
          },
        },
      ],
    },
  ]

export { navigation };
