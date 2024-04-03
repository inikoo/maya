import React from 'react';
import BaseScanner from '~/Components/BaseScanner';
import {useSelector} from 'react-redux';
import {MAINCOLORS} from '~/Utils/Colors';

export default function PalletScanner() {
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  return (
    <BaseScanner
      title="Return"
      scannerKey="return"
      showMarker={true}
      markerStyle={{borderColor: MAINCOLORS.primary}}
      prefix="par"
      args={[organisation.active_organisation.id, warehouse.id]}
    />
  );
}
