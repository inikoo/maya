
import React, {} from 'react';
import { SafeAreaView } from 'react-native';
import BottomTabs from '@/src/components/BottomTabs'

import DeliveryNotes from '@/src/screens/DeliveryNotes';
import FulfilmentReturns from '@/src/screens/FulfilmentReturns'

import { faTruck , faSignOut  } from '@/private/fa/pro-regular-svg-icons';

const TabArr = [
  {route: 'delivery-notes', label: 'Notes', icon: faTruck, component: DeliveryNotes},
  {route: 'fulfilment-returns', label: 'Returns', icon: faSignOut, component: FulfilmentReturns},
];

export default function AnimTab3() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomTabs tabArr={TabArr} />
    </SafeAreaView>
  );
}