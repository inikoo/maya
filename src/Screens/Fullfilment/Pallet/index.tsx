import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Icon,Dialog} from '@rneui/themed';
import {MAINCOLORS,COLORS } from '~/Utils/Colors';
import Information from '~/Components/palletComponents/Information';
import PalletCard from '~/Components/palletComponents/ListCard';

const Pallet = props => {
  const navigation = useNavigation();
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [openDialog, setOpenDialog] = useState(false);

  const setDialog = () => {
    setOpenDialog(!openDialog);
  }

  return (
    <>
      <BaseList
        title='Pallets'
        itemKey='reference'
        prefix='pallets'
        urlKey="pallet-index"
        sortSchema='reference'
        screenNavigation={'Pallet Scanner'}
        enableSwipe={true}
        args={[
          oraganisation.active_organisation.id,
          warehouse.id,
          oraganisation.active_organisation.active_authorised_fulfilments.id,
        ]}
        filterSchema={[
          {
            title : 'Status',
            key : 'pallets_elements[status]',
            type : "checkBox",
            propsItem : {
              options : [
                {
                  label : 'Receiving',
                  value : 'receiving',
                },
                {
                  label : 'Not Received',
                  value : 'not-received',
                },
                {
                  label : 'Storing',
                  value : 'storing',
                },
                {
                  label : 'Returning',
                  value : 'return',
                },
                {
                  label : 'Returned',
                  value : 'returned',
                },
                {
                  label : 'Incident',
                  value : 'incident',
                },
              ]
            }
          }
        
        ]}
        itemList={(record) => (
          <PalletCard
              data={{
                  record: record,
              }}
          />
      )} 
      />
      <Dialog isVisible={openDialog} onBackdropPress={setDialog}>
      <Dialog.Title title="Info" />
      <Information />
    </Dialog>
  </>
  );
};

export default Pallet;

const styles = StyleSheet.create({});
