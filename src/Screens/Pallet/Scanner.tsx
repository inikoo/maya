import React, {useState} from 'react';
import {View} from 'react-native';
import BaseScanner from '~/Components/BaseScanner';
import {useSelector} from 'react-redux';

export default function PalletScanner() {
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  return (
    <BaseScanner
      urlKey="pallate-show"
      title="Pallet"
      scannerKey='pallet'
      showMarker={true}
      args={[
        organisation.active_organisation.id,
        warehouse.id,
        organisation.active_organisation.active_authorised_fulfilments.slug,
      ]}
    />
  );
}
