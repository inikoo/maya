import React from 'react';
import {StyleSheet} from 'react-native';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import BaseScanner from '~/Components/BaseScanner';
import {useNavigation} from '@react-navigation/native';
import {Request} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';


export default function ScannerPageChangeLocation() {
  const navigation = useNavigation();

  const ChangeLocation = async (response : any ) => {
    if(response.data.model.id && response.data.model_type == 'Location'){
    await Request(
      'patch',
      'pallet-location',
      {},
      {},
      [response.data.model.id , props.pallet],
      ChangeLocationSuccess,
      ChangeLocationFailed,
    );
   }
  };
  const ChangeLocationSuccess = ( response : any ) => {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet location updated',
    });
  };

  const ChangeLocationFailed = (error : any) => {
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
        <BaseScanner prefix={'Location'} onSuccess={} />
      </>
    </Layout>
  );
}

const styles = StyleSheet.create({});
