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
      <Header title="Scanner Pallet" useLeftIcon={true} />
      <BaseScanner 
        prefix={'Pallet'} 
        onSuccess={(e)=>navigation.navigate('Pallet', {pallet: e.data.model})}
      />
      </>
    </Layout>
  );
}

const styles = StyleSheet.create({});
