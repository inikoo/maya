import React, {useState} from 'react';
import {View} from 'react-native';
import BaseScanner from '~/Components/BaseScanner';
import {useSelector} from 'react-redux';

export default function LocationScanner() {
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  return (
    <BaseScanner
      urlKey="locations-show"
      title="Location"
      scannerKey='location'
      showMarker={true}
      args={[organisation.active_organisation.id, warehouse.id]}
    />
  );
}
