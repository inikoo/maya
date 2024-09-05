import React, {useState, useEffect, ReactNode } from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Dialog, Text, Divider, Icon} from '@rneui/themed';
import Button from '~/Components/Button';
import {Request} from '~/Utils';
import { reduxData, Location2 } from '~/Utils/types';
import {useSelector} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

type Props = {
  title: ReactNode;
  visible: Boolean;
  onClose: Function;
  onSuccess: Function;
  onFailed: Function;
  data?: Location2
  stockId:Number|any
};

function StockCheck(props: Props) {
  const organisation = useSelector((state : reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);
  const [value, setValue] = useState(String(props?.data?.quantity));
  const [location, setLocation] = useState('');
  const [errorvalue, setErrorvalue] = useState('');

  const getLocationCode = async () => {
    await Request(
      'get',
      'locations-show-by-code',
      {},
      {},
      [organisation.active_organisation.id, warehouse.id, location],
      LocationCodeSuccess,
      LocationCodeFailed,
    );
  };

  const LocationCodeSuccess = async (response : any ) => {
    await Request(
      'post',
      'org-stock-move-location',
      {},
      {},
      [props.stockId,response.id],
      MoveLocationCodeSuccess,
      MoveLocationCodeFailed,
    );
  };

  const MoveLocationCodeSuccess = (response : any) => {
    props.onClose();
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Success move location',
    });
}

  const MoveLocationCodeFailed = (error : any) => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error.response.data.message || 'failed find location',
      });
  }

  const LocationCodeFailed = (error : any) => {
    if (error.response.status == 404) {
      setErrorvalue('cannot find location');
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error.response.data.message || 'failed find location',
      });
    }
  };

  const onCancel = () => {
    props.onClose();
  };

useEffect(()=>{
    setValue(String(props?.data?.quantity))
},[props.visible])


  return (
    <Dialog isVisible={props.visible}>
      <Dialog.Title title={props.title} />
      <Divider />
      <View>
        <View>
        <Text style={styles.textLabel}>Stock:</Text>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Code"
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
            />
          </View>
        </View>
        <Text style={styles.errorText}>{errorvalue}</Text>
        </View>
        <View>
        <Text style={styles.textLabel}>Location Code : </Text>
        <View style={styles.searchContainer}>
        <View style={{...styles.inputContainer, width : '80%'}}>
            <TextInput
              style={styles.input}
              placeholder="Code"
              value={location}
              onChangeText={setLocation}
            />
          </View>
          <View style={styles.buttonScan}>
            <TouchableOpacity
              style={styles.searchIcon}
              onPress={() =>null}>
              <Icon name="qr-code-scanner" type="material" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{color: 'red', fontSize: 12}}>{errorvalue}</Text>

        </View>
       
        <Divider style={{marginTop: 20}} />
        <View style={styles.dialogButtonContainer}>
          <Button type="secondary" title="Cancel" onPress={onCancel} />
          <Button type="primary" title="Submit" onPress={getLocationCode}/>
        </View>
      </View>
    </Dialog>
  );
}

StockCheck.defaultProps = {
  title: 'Move Stock',
  visible: false,
  onClose: () => null,
  bulkMode: false,
  onFailed: () => null,
  onSuccess: () => null,
};

const styles = StyleSheet.create({
  dialogButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },
  searchIcon: {
    paddingVertical: 8,
    paddingHorizontal: 5,
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
  inputContainer: {
    width: '100%',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 3,
  },
  textLabel: {
    fontWeight: '500',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default StockCheck;
