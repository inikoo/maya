
import React, {} from 'react';
import { SafeAreaView } from 'react-native';
import BottomTabs from '@/src/components/BottomTabs'

import Locations from '@/src/screens/Locations';
import Areas from '@/src/screens/Areas';

import { faMapSigns , faInventory } from '@/private/fa/pro-regular-svg-icons';

const TabArr = [
  {route: 'locations', label: 'Locations', icon: faMapSigns, component: Locations},
  {route: 'areas', label: 'Areas', icon: faInventory, component: Areas},
];

export default function AnimTab3() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomTabs tabArr={TabArr} />
    </SafeAreaView>
  );
}