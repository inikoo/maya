import React from 'react';
import {StyleSheet, View} from 'react-native';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import BaseScanner from '~/Components/BaseScanner';

export default function ScannerPage() {
  return (
    <Layout>
      <View>
        <Header title="Scanner Pallet" useLeftIcon={true} />
        <BaseScanner prefix={'Pallet'} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({});
