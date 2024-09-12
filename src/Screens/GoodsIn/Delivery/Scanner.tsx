import React  from 'react';
import { StyleSheet } from 'react-native';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import BaseScanner from '~/Components/BaseScanner';
import { useNavigation } from '@react-navigation/native';

export default function ScannerPage() {
  const navigation = useNavigation()
  return (
    <Layout>
      <>
      <Header title="Scanner Delivery" useLeftIcon={true} />
      <BaseScanner 
        prefix={'PalletDelivery'} 
        onSuccess={(e)=>navigation.navigate('ShowDelivery', {delivery: e.data.model})}
      />
      </>
    </Layout>
  );
}

const styles = StyleSheet.create({});
