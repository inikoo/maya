import React,{useState} from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
  } from 'react-native';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import {Request} from '~/Utils';
import Empty from '~/Components/Empty';
import {MAINCOLORS} from '~/Utils/Colors';
import {useSelector} from 'react-redux';
import Pallet from '..';
/* import BaseScanner from '~/Components/BaseScanner'; */

export default function ScannerPage(props) {
    const organisation = useSelector(state => state.organisationReducer);
    const warehouse = useSelector(state => state.warehouseReducer);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleBarCodeScanned = (data: String) => {
        setLoading(true);
        Request(
          'get',
          'global-search-scanner',
          {},
          { type : 'Location' },
          [organisation.active_organisation.id, warehouse.id, data],
          onSuccess,
          onFailed,
        );
      };
    
      const onSuccess = async (response) => {
        console.log(response)
        setScanned(false);
        setLoading(false);
        ChangeLocation(response.data.model)
      };
    
      const onFailed = res => {
        setScanned(false);
        setLoading(false);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: res.response.data.message,
        });
      };

      const ChangeLocation = async (response) => {
        await Request(
          'patch',
          'pallet-location',
          {},
          {},
          [
           response.id, 
           props.route.params.pallet.id,
          ],
          ChangeLocationSuccess,
          ChangeLocationFailed,
        );
      };
    
      const ChangeLocationSuccess = response =>{
        navigation.navigate('Pallet',{pallet : props.route.params.pallet })
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Pallet location updated',
        });
      }
    
      const ChangeLocationFailed = error =>{
        console.log('errorMove',error)
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: error.response.data.message,
        });
      }

    
      const onSuccessScanner = async (result : Object) => {
        setScanned(false);
        handleBarCodeScanned(result.data)
      };

  return (
    <Layout>
      <View style={{ flex : 1}}>
      <Header title="Scan Location" useLeftIcon={true} />
      <View style={styles.container}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={MAINCOLORS.primary} />
        </View>
      ) : scanned ? (
        <View style={styles.qrCodeScanner}>
          <QRCodeScanner 
             showMarker={true}
             markerStyle={{
                 borderColor : MAINCOLORS.primary
             }}
            onRead={onSuccessScanner} />
        </View>
      ) : (
        <View>
          <Empty
            buttonOnPress={() => setScanned(true)}
            title=""
            subtitle=""
            button={{size: 'lg', text: 'Start Scan', color: 'primary'}}
          />
        </View>
      )}
    </View>
    </View>
    </Layout>
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
  });
