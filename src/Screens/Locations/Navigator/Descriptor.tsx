import { GlobalSearch, WarehouseInLocation, Area, Location } from '~/Screens';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faChartNetwork, faSearch, faWarehouseAlt, faMapSigns, faInventory } from 'assets/fa/pro-regular-svg-icons';

library.add(faChartNetwork, faSearch, faWarehouseAlt, faMapSigns, faInventory);

const navigation = [
    {
      name: 'DashboardLocations',
      options: { headerShown: false },
      components: [
        {
          name: 'Warehouses',
          component: WarehouseInLocation,
          options: {
            headerShown: false,
            tabBarIcon: faWarehouseAlt,
            tabBarLabel : 'Warehouses'
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
