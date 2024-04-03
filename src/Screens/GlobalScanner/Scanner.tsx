import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button} from '@rneui/themed';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';

export default function ScannerPage(props) {
  const [scanned, setScanned] = useState(true);

  const handleBarCodeScanned = async data => {
    props.searchFromServer(data);
  };

  const onSuccess = async e => {
    setScanned(false);
    handleBarCodeScanned(e.data);
  };

  return (
    <View style={styles.container}>
      {scanned ? (
        <View style={styles.qrCodeScanner}>
          <QRCodeScanner
            onRead={onSuccess}
            showMarker={true}
            markerStyle={{borderColor: MAINCOLORS.primary}}
          />
        </View>
      ) : (
        <View style={styles.scrollViewContainer}>
          {!props.data && (
            <TouchableOpacity style={styles.noResultContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/image/20944142.jpg')}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.tryAgainText}>
                No results found. Try again.
              </Text>
              <Button
                onPress={() => setScanned(true)}
                buttonStyle={{margin: 20}}>
                Scan again
              </Button>
            </TouchableOpacity>
          )}
        </View>
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
  scrollViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  noResultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  tryAgainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  cardContainer: {
    flex: 1,
    width: '100%',
  },
  speedDial: {
    position: 'absolute',
    bottom: 0,
    right: -10,
  },
});
