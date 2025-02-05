
import React, {} from 'react';
import { SafeAreaView } from 'react-native';
import BottomTabs from '@/src/components/BottomTabs'

import Families from '@/src/screens/Families';
import Pallet from '@/src/screens/Pallet'
import StoredItem from '@/src/screens/StoredItem'

import { faBoxesAlt, faPallet, faNarwhal } from '@/private/fa/pro-regular-svg-icons';

const TabArr = [
  {route: 'families', label: 'Families', icon: faBoxesAlt, component: Families},
  {route: 'pallet', label: 'Pallet', icon: faPallet, component: Pallet},
  {route: 'stored-items', label: 'Stored Item', icon: faNarwhal, component: StoredItem},
];

export default function AnimTab3() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomTabs tabArr={TabArr} />
    </SafeAreaView>
  );
}