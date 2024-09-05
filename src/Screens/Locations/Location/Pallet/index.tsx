import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import PalletCard from '~/Components/palletComponents/ListCardDelivery';
import {reduxData, PalletTypesIndex, DetailLocationTypes } from '~/Utils/types'

type Props = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      location: DetailLocationTypes;
    };
    path: string;
  };
};

const LocationPallet = (props : Props) => {
  const oraganisation = useSelector((state : reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);
  const location = props.route.params.location;


  return (
    <BaseList
      urlKey="location-pallet-index"
      prefix="pallets"
      screenNavigation={'Pallet Scanner'}
      args={[
        oraganisation.active_organisation.id,
        warehouse.id,
        oraganisation.active_organisation.active_authorised_fulfilments.id,
        location.id,
      ]}
      itemKey="reference"
      title={`Pallets in ${location.code}`}
      itemList={(record : PalletTypesIndex) => (
        <PalletCard
          data={{
            record: record,
          }}
        />
      )}
    />
  );
};

export default LocationPallet;

const styles = StyleSheet.create({});
