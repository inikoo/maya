import React  from 'react';
import { StyleSheet } from 'react-native';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import BaseScanner from '~/Components/BaseScanner';

export default function ScannerPage(props) {

  return (
    <Layout>
      <Header title="Scanner" useLeftIcon={true} />
      <BaseScanner />
    </Layout>
  );
}

const styles = StyleSheet.create({});
