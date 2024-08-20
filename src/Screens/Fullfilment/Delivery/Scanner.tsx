import React from 'react';
import BaseScanner from '~/Components/BaseScanner';
import {useSelector} from 'react-redux';
import {MAINCOLORS} from '~/Utils/Colors';

export default function PalletScanner() {
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  return (
    <BaseScanner
      title="Delivery"
      scannerKey="delivery"
      showMarker={true}
      markerStyle={{borderColor: MAINCOLORS.primary}}
      prefix="pad"
      args={[organisation.active_organisation.id, warehouse.id]}
    />
  );
}
