import React, { useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from '@/src/components/Context/context';
import BaseList from '@/src/components/BaseList';
import globalStyles from '@/globalStyles';

const StockDeliveries = ({navigation}) => {
  const {organisation, warehouse } = useContext(AuthContext); 

  return (
    <View style={globalStyles.container}>
      <BaseList 
        navigation={navigation}
        urlKey='get-stock-deliveries'
        args={[organisation.id,warehouse.id]}
      />
    </View>
  );
};

export default StockDeliveries;
