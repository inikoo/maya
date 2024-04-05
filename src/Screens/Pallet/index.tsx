import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList';
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
        urlKey="pallet-index"
        navigation={props.navigation}
        args={[
          oraganisation.active_organisation.id,
          warehouse.id,
          oraganisation.active_organisation.active_authorised_fulfilments.id,
        ]}
        renderItem={(data)=><PalletCard data={data.item} />}
        title='Pallet'
        settingOptions={[
          {
            icon: {name: 'info', type: 'antdesign'},
            title: 'Info',
            onPress: () => setDialog(),
          },
        ]}
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
