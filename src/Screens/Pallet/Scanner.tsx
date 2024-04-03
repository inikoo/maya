import React, {useState} from 'react';
import {View} from 'react-native';
import BaseScanner from '~/Components/BaseScanner';
import {useSelector} from 'react-redux';
import {MAINCOLORS} from '~/Utils/Colors';

export default function PalletScanner() {
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  return (
    <BaseScanner
      title="Pallet"
      scannerKey="pallet"
      showMarker={true}
      markerStyle={{borderColor: MAINCOLORS.primary}}
      prefix="pal"
      args={[organisation.active_organisation.id, warehouse.id]}
    />
  );
}
