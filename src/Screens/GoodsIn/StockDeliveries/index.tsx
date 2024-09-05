import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import { Icon } from '@rneui/themed';
import {reduxData, PropsScreens} from '~/Utils/types';

const StockDeliveries = (props : PropsScreens) => {
  const organisation = useSelector((state : reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);

  return (
    <>
      <BaseList
        headerProps={{
          useLeftIcon: true,
          leftIcon: (
            <TouchableOpacity
              style={styles.leftIconContainer}
              onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="bars" type="font-awesome-5" color="black" size={20} />
            </TouchableOpacity>
          ),
        }}
        title="Stock Deliveries"
        itemKey='code'
        urlKey='stock-deliveries-index'
        args={[organisation.active_organisation.id, warehouse.id]}
        enableSwipe={false}
        sortSchema='code'
        screenNavigation={'Location Scanner'}
      />
    </>
  );
};

export default StockDeliveries;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  leftIconContainer: {
    marginRight: 18,
  },
});
