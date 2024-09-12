import React, {useState, ReactNode, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {Text, Divider, Icon, Dialog} from '@rneui/themed';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import Button from '~/Components/Button';
import { reduxData } from '~/Types/types';

type Props = {
    title: ReactNode|String;
    visible : Boolean,
    onClose : Function,
    item: Number|null|any
    bulk : boolean
    onSuccess : Function,
    onFailed : Function,
    pallet : object
  };

function Changeitem(props : Props) {
  const navigation = useNavigation();
  const organisation = useSelector((state : reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);
  const [palletCode, setpalletCode] = useState<String|null>('');
  const [errorpalletCode, setErrorpalletCode] = useState('');
  const [quantity, setQuantity] = useState<number | null>(0);
  const [errorQuantity, setErrorQuantity] = useState('');
  const [MIN_QUANTITY, setMin_quantity] = useState<number>(0);
  const [MAX_QUANTITY, setMax_quantity] = useState<number>(0);


  const getPalletCode = async () => {
    await Request(
      'get',
      'global-search-scanner',
      {},
      {type : 'Pallet'},
      [organisation.active_organisation.id, warehouse.id, palletCode],
      PalletCodeSuccess,
      PalletCodeFailed,
    );
  };

  const PalletCodeSuccess = async(response : any) => {
   if(response.data.model.id && response.data.model_type == 'Pallet'){
    await Request(
        'patch',
        'stored-item-pallet',
        {},
        {quantity : quantity, pallet_id: response.data.model.id},
        [props.pallet.id,props.item.id],
        PalletChangeSuccsess,
        PalletChangeFailed,
      );
   }
  }

  const PalletCodeFailed = (error : any) => {
    if (error.response.status == 404) {
        setErrorpalletCode('cannot find pallet');
      } else {
        setErrorpalletCode(error?.response?.data?.message || 'Server error');
      }
  }

  const PalletChangeSuccsess = (response : any) => {
    props.onSuccess()
    onCancel()
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet location updated',
    });
  }

  const PalletChangeFailed = (error : any) => {
    console.log(error)
    props.onFailed()
    onCancel()
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  }

 


  const onCancel = () => {
    props.onClose()
  };

  const onChangeCode = (value: String) => {
    setpalletCode(value);
    setErrorpalletCode('');
  };

  const onChangeQuantity = (value: string) => {
    const numericValue = parseInt(value, 10);
  
    if (isNaN(numericValue)) {
      setErrorQuantity('Invalid quantity');
      setQuantity(null);
    } else if (numericValue < MIN_QUANTITY) {
      setErrorQuantity(`Quantity cannot be less than ${MIN_QUANTITY}`);
      setQuantity(MIN_QUANTITY);
    } else if (numericValue > MAX_QUANTITY) {
      setErrorQuantity(`Quantity cannot be more than ${MAX_QUANTITY}`);
      setQuantity(MAX_QUANTITY);
    } else {
      setErrorQuantity('');
      setQuantity(numericValue);
    }
  };

  useEffect(()=>{
    setQuantity(0)
    setMax_quantity(props?.pallet?.stored_items_quantity)
  },[props.pallet])

  return (
    <Dialog isVisible={props.visible}>
      <Dialog.Title title={props.title} />
      <Divider />
      <View>
        <Text style={{...styles.textLabel, marginTop : 20}}>Pallet Code: </Text>
        <View style={styles.searchContainer}>
          <View style={{...styles.inputContainer, width : '80%'}}>
            <TextInput
              style={styles.input}
              placeholder="Code"
              value={palletCode}
              onChangeText={onChangeCode}
            />
          </View>
          <View style={styles.buttonScan}>
            <TouchableOpacity
              style={styles.searchIcon}>
              <Icon name="qr-code-scanner" type="material" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{color: 'red', fontSize: 12}}>{errorpalletCode}</Text>

        {/* Input for Quantity */}
        <Text style={styles.textLabel}>Quantity: </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={quantity ? quantity.toString() : ''}
            onChangeText={onChangeQuantity}
          />
        </View>
        <Text style={{color: 'red', fontSize: 12}}>{errorQuantity}</Text>
      </View>
      
      <Divider style={{marginTop: 20}} />
      <View style={styles.dialogButtonContainer}>
        <Button type="secondary" title="Cancel" onPress={onCancel} />
        <Button type="primary" title="Submit" onPress={getPalletCode} />
      </View>
    </Dialog>
  );
}

Changeitem.defaultProps = {
    title: 'Change Pallet',
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
    width: '100%',
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  buttonScan: {
    width: '19%',
    marginTop: 15,
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
  },
});

export default Changeitem;
