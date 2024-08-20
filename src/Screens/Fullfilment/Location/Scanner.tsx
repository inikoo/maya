import React  from 'react';
import { StyleSheet } from 'react-native';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import BaseScanner from '~/Components/BaseScanner';

export default function ScannerPage() {

  return (
    <Layout>
      <Header title="Scanner Location" useLeftIcon={true} />
      <BaseScanner prefix={'Location'} />
    </Layout>
  );
}

const styles = StyleSheet.create({});
