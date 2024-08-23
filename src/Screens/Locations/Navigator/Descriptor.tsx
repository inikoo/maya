import { GlobalSearch, LocationsDashboard, Area, Location } from '~/Screens';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faChartNetwork, faSearch, faWarehouseAlt, faMapSigns, faInventory } from 'assets/fa/pro-regular-svg-icons';

library.add(faChartNetwork, faSearch, faWarehouseAlt, faMapSigns, faInventory);

const navigation = [
    {
      name: 'DashboardLocations',
      options: { headerShown: false },
      components: [
        {
          name: 'Home',
          component: LocationsDashboard,
          options: {
            headerShown: false,
            tabBarIcon: faChartNetwork,
            tabBarLabel: 'Dasboard',
          },
        },
        {
          name: 'Areas',
          component: Area,
          options: {
            tabBarLabel: 'Areas',
            headerShown: false,
            tabBarIcon: faMapSigns,
          },
        },
        {
          name: 'Locations',
          component: Location,
          options: {
            tabBarLabel: 'Locations',
            headerShown: false,
            tabBarIcon: faInventory,
          },
        },
      ],
    },
  ]

export { navigation };
