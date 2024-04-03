import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import LocationCard from './card/LocationCard';
import PalletCard from './card/PalletCard';
import StoredItem from './card/StoredItem';
import { SpeedDial, Button } from '@rneui/themed';
import { COLORS, MAINCOLORS } from '~/Utils/Colors';

export default function Scanner(props) {
  const [scanned, setScanned] = useState(true);
  const [open, setOpen] = useState(false); // State for SpeedDial

  const handleBarCodeScanned = async (data) => {
    props.searchFromServer(data);
  };

  const renderCard = () => {
    if (props.data?.model_type === 'Location') return <LocationCard data={props.data} />;
    if (props.data?.model_type === 'Pallet') return <PalletCard data={props.data} />;
    if (props.data?.model_type === 'StoredItem') return <StoredItem data={props.data} />;
  };

  const onSuccess = async (e) => {
    setScanned(false);
    handleBarCodeScanned(e.data);
  };

  return (
    <View style={styles.container}>
      {scanned ? (
        <View style={styles.qrCodeScanner}>
          <QRCodeScanner onRead={onSuccess} showMarker={true} />
        </View>
      ) : (
        <View style={styles.scrollViewContainer}>
          {!props.data && (
            <TouchableOpacity
             
              style={styles.noResultContainer}>
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
              <Button onPress={() => setScanned(true)} buttonStyle={{ margin : 20}}>
                Scan again
              </Button>
            </TouchableOpacity>
          )}
          {props.data && (
            <View style={styles.cardContainer}>
              {renderCard()}
              <SpeedDial
                isOpen={open}
                icon={{ name: 'close', color: COLORS.grey8 }}
                openIcon={{ name: 'close', color: COLORS.grey8 }}
                buttonStyle={{ backgroundColor: MAINCOLORS.danger }}
                style={styles.speedDial}
                overlayColor={'transparent'}
                onOpen={()=>onSuccess({data : '' })}
                >
              </SpeedDial>
            </View>
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
