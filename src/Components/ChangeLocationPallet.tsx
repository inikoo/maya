import React, {useState, useEffect, useRef } from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {Text, Divider, Icon, Dialog} from '@rneui/themed';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import Button from '~/Components/Button';
import { reduxData } from '~/types/types';
import SelectQuery from '~/Components/Selectquery';

type Props = {
    title?: String;
    visible : Boolean,
    onClose : Function,
    pallet : Number|null|any
    bulkMode?: Boolean
    onSuccess : Function,
    onFailed : Function
  };

function ChangeLocation(props : Props) {
  const navigation = useNavigation();
  const organisation = useSelector((state : reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);
  const [locationCode, setLocationCode] = useState<String|null>('');
  const [errorLocationCode, setErrorLocationCode] = useState('');
  const inputRef = useRef<TextInput>(null);

 /*  const getLocationCode = async () => {
    await Request(
      'get',
      'global-search-scanner',
      {},
      {type : 'Location'},
      [organisation.active_organisation.id, warehouse.id, locationCode],
      LocationCodeSuccess,
      LocationCodeFailed,
    );
  }; */

  const changeLocation = async (response : any ) => {
    await Request(
      'patch',
      'pallet-location',
      {},
      {},
      [locationCode , props.pallet],
      ChangeLocationSuccess,
      ChangeLocationFailed,
    );
   }

/*   const LocationCodeFailed = (response : any) => {
    if (response.response.status == 404) {
      setErrorLocationCode('cannot find location');
    } else {
      setErrorLocationCode(response?.response?.data?.message || 'Server error');
    }
  }; */

  const ChangeLocationSuccess = ( response : any ) => {
    onCancel()
    props.onSuccess()
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet location updated',
    });
  };

  const ChangeLocationFailed = (error : any) => {
    props.onFailed()
    onCancel()
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to set Location',
    });
  };

  const onCancel = () => {
    props.onClose()
  };

 /*  const onChangeCode = (value: String) => {
    setLocationCode(value);
    setErrorLocationCode('');
  }; */

/*   const onSubmit = () => {
    getLocationCode();
    Keyboard.dismiss();
  };
 */

/*   useEffect(() => {
    if (props.visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.visible]); */

  return (
    <Dialog isVisible={props.visible}>
      <Dialog.Title title={props.title} />
      <Divider />
      <View>
        <Text style={styles.textLabel}>Location Code : </Text>
        <View style={styles.searchContainer}>
         {/*  <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Code"
              value={locationCode}
              ref={inputRef}
              onChangeText={onChangeCode}
              onSubmitEditing={onSubmit}
            />
          </View> */}
          <View style={{ width : '80%'}}>
            <SelectQuery
              urlKey={'locations-index'}
              args={[organisation.active_organisation.id, warehouse.id]}
              value={locationCode}
              onChange={e => setLocationCode(e.id)}
            />
            </View>

          <View style={styles.buttonScan}>
            <TouchableOpacity
              style={styles.searchIcon}
              onPress={() =>
                navigation.navigate('ScannerMoveLocation', { pallet: props.pallet })
              }>
              <Icon name="qr-code-scanner" type="material" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{color: 'red', fontSize: 12}}>{errorLocationCode}</Text>
        <Divider style={{marginTop: 20}} />
        <View style={styles.dialogButtonContainer}>
          <Button type="secondary" title="Cancel" onPress={onCancel} />
          <Button type="primary" title="Submit" onPress={changeLocation} />
        </View>
      </View>
    </Dialog>
  );
}

ChangeLocation.defaultProps = {
    title: 'Set Location',
    visible : false,
    onClose : ()=> null,
    bulkMode : false,
    onFailed : () => null,
    onSuccess : () => null
  };

const styles = StyleSheet.create({
  dialogButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '81%',
    marginTop: 5,
    marginBottom: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  buttonScan: {
    width: '19%',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 3,
  },
  searchIcon: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  textLabel: {
    fontWeight: '500',
    marginTop: 20,
  },
});

export default ChangeLocation;