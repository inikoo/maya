import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button} from '@rneui/themed';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import { Request, PrefixScanner } from '~/Utils';
import {useSelector} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export default function ScannerPage(props) {
  const [scanned, setScanned] = useState(true);
  const [loading, setLoading] = useState(false);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);


  const searchFromServer = (data: String) => {
    setLoading(true);
    Request(
      'get',
      'global-search',
      {},
      {},
      [organisation.active_organisation.id, warehouse.id, data],
      onSuccessGetLocation,
      onFailedGetLocation,
    );
  };

  const onSuccessGetLocation = result => {
    if(result.data.model_type == "Location"){
      props.searchFromServer(result.data.model) 
    }
    setLoading(false);
  };

  const onFailedGetLocation = (error: object) => {
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'you need scan a location',
    });
  };

  const onSuccess = async e => {
    setScanned(false);
    if(PrefixScanner('loc',e.data))searchFromServer(e.data);
    else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'you need scan a location',
      });
    }
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
                  source={require('../../../../assets/image/20944142.jpg')}
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
