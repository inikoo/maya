import React from 'react';
import {SafeAreaView} from 'react-native';
import BottomTabs from '@/src/components/BottomTabs';
import {DeliveryProvider} from '@/src/components/Context/delivery';

import PalletInDeliveries from '@/src/screens/Delivery/PalletInDeliveries';
import ShowFulfilmentDelivery from '@/src/screens/Delivery/ShowFulfilmentDelivery';

import {faPallet, faTachometerAlt} from '@/private/fa/pro-regular-svg-icons';

const DeliveryStackScreen = ({navigation, route}) => {
  const TabArr = [
    {
      route: 'delivery-showcase',
      label: 'Showcase',
      icon: faTachometerAlt,
      component: props => (
        <ShowFulfilmentDelivery
          {...props}
          navigation={navigation}
          route={route}
        />
      ),
    },
    {
      route: 'pallets-in-delivery',
      label: 'Pallets',
      icon: faPallet,
      component: props => (
        <PalletInDeliveries {...props} navigation={navigation} route={route} />
      ),
    },
  ];

  return (
    <DeliveryProvider>
      <SafeAreaView style={{flex: 1}}>
        <BottomTabs tabArr={TabArr} />
      </SafeAreaView>
    </DeliveryProvider>
  );
};

export default DeliveryStackScreen;
