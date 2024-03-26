import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import LocationCard from './card/LocationCard';
import PalletCard from './card/PalletCard';
import StoredItem from './card/StoredItem';

export default function Scanner(p) {
  const handleBarCodeScanned = async (data) => {
    p.searchFromServer(data);
  };

  const renderCard = () => {
    if (p.data.model_type == 'Location') return <LocationCard data={p.data} />;
    if (p.data.model_type == 'Pallet') return <PalletCard data={p.data} />;
    if (p.data.model_type == 'StoredItem') return <StoredItem data={p.data} />;
  };

  const onSuccess = async e => {
    const data = await PrefixScanner(e.data)
    handleBarCodeScanned(data);
  };

  return (
    <View style={styles.container}>
      {!p.data ? (
        <View style={styles.qrCodeScanner}>
           <QRCodeScanner onRead={onSuccess} showMarker={true} /> 
        </View>
      ) : (
        renderCard()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCodeScanner: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tryAgainText: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    maxHeight: 100,
    width: 100,
    marginRight: 10, // Add margin for separation
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  topContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginDescription: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
