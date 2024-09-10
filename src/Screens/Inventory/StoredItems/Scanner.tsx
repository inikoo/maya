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
        <Header title="Scanner Location" useLeftIcon={true} />
        <BaseScanner 
          prefix={'S'} 
          onSuccess={(e)=>navigation.navigate('Location', {location: {...e.data.model}})}
        />
      </>
    </Layout>
  );
}

const styles = StyleSheet.create({});
