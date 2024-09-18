import React from 'react';
import {StyleSheet} from 'react-native';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import BaseScanner from '~/Components/BaseScanner';
import {useNavigation} from '@react-navigation/native';
import {Request} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {PalletDetailTypes} from '~/types/types';

type Props = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      pallet: PalletDetailTypes;
    };
    path: string;
  };
};

export default function ScannerPageChangeStoredItemLocation(porps : Props) {
  const navigation = useNavigation();

  const ChangeLocation = async (response : any ) => {
    if(response.data.model.id && response.data.model_type == 'Pallet'){
    await Request(
      'patch',
      'stored-item-pallet',
      {},
      {},
      [response.data.model.id,porps.route.params.pallet.id],
      ChangeLocationSuccess,
      ChangeLocationFailed,
    );
   }
  };

  const ChangeLocationSuccess = ( response : any ) => {
    navigation.navigate('ShowStoredItem',{item : response})
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet location updated',
    });
  };

  const ChangeLocationFailed = (error : any) => {
    console.log(error)
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to set Location',
    });
  };


  return (
    <Layout>
      <>
        <Header title="Scanner Location" useLeftIcon={true} />
        <BaseScanner prefix={'Location'} onSuccess={ChangeLocation} />
      </>
    </Layout>
  );
}

const styles = StyleSheet.create({});
