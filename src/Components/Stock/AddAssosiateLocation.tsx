import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {Text, Divider, Icon, Dialog} from '@rneui/themed';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import Button from '~/Components/Button';


type Props = {
    title: ReactNode;
    visible : Boolean,
    onClose : Function,
    pallet: Object
    bulk : boolean
    onSuccess : Function,
    onFailed : Function
  };

function AssociateLocation(props : Props) {
  const navigation = useNavigation();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [locationCode, setLocationCode] = useState(null);
  const [errorLocationCode, setErrorLocationCode] = useState('');

  const getLocationCode = async () => {
  /*   await Request(
      'get',
      'locations-show-by-code',
      {},
      {},
      [organisation.active_organisation.id, warehouse.id, locationCode],
      LocationCodeSuccess,
      LocationCodeFailed,
    ); */
  };

  const LocationCodeSuccess = async response => {
    await Request(
      'patch',
      'pallet-location',
      {},
      {},
      [response.id, props.pallet],
      ChangeLocationSuccess,
      ChangeLocationFailed,
    );
  };

  const LocationCodeFailed = response => {
    if (response.response.status == 404) {
      setErrorLocationCode('cannot find location');
    } else {
      setErrorLocationCode(response?.response?.data?.message || 'Server error');
    }
  };

  const ChangeLocationSuccess = response => {
    props.onSuccess()
    onCancel()
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet location updated',
    });
  };

  const ChangeLocationFailed = error => {
    props.onFailed()
    console.log('errorMove', error);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };


  const onCancel = () => {
    props.onClose()
  };

  const onChangeCode = (value: String) => {
    setLocationCode(value);
    setErrorLocationCode('');
  };

  return (
    <Dialog isVisible={props.visible}>
      <Dialog.Title title={props.title} />
      <Divider />
      <View>
        <Text style={styles.textLabel}>Location Code : </Text>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Code"
              value={locationCode}
              onChangeText={onChangeCode}
            />
          </View>
          <View style={styles.buttonScan}>
            <TouchableOpacity
              style={styles.searchIcon}
              onPress={() =>
                navigation.navigate('Change Location Pallet Scanner', {
                  pallet: props.pallet,
                })
              }>
              <Icon name="qr-code-scanner" type="material" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{color: 'red', fontSize: 12}}>{errorLocationCode}</Text>
        <Divider style={{marginTop: 20}} />
        <View style={styles.dialogButtonContainer}>
          <Button type="secondary" title="Cancel" onPress={onCancel} />
          <Button type="primary" title="Submit" onPress={getLocationCode} />
        </View>
      </View>
    </Dialog>
  );
}

AssociateLocation.defaultProps = {
    title: 'Add Associate Location',
    visible : false,
    onClose : ()=>null,
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
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  buttonScan: {
    width: '15%',
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

export default AssociateLocation;
