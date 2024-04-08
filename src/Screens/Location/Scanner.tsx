import React from 'react';
import BaseScanner from '~/Components/BaseScanner';
import {useSelector} from 'react-redux';
import { MAINCOLORS } from '~/Utils/Colors';

export default function LocationScanner() {
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  return (
    <BaseScanner
      title="Location"
      scannerKey='location'
      prefix='loc'
      showMarker={true}
      markerStyle={{ borderColor : MAINCOLORS.primary }}
      args={[organisation.active_organisation.id, warehouse.id]}
    />
  );
}
