import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import PalletCard from '~/Components/palletComponents/ListCard';

const LocationPallet = props => {
  const navigation = useNavigation();
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
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
      itemList={record => (
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

const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignItems: 'center',
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  description: {
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
