import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {Text, Divider, Icon, Dialog} from '@rneui/themed';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import Button from '~/Components/Button';
import {reduxData} from '~/types/types';
import SelectQuery from '~/Components/Selectquery';

type Props = {
  title?: String;
  visible: Boolean;
  stock: Object;
  onClose: Function;
  onSuccess: Function;
  onFailed: Function;
};

function ChangeLocation(props: Props) {
  const navigation = useNavigation();
  const organisation = useSelector((state: reduxData) => state.organisationReducer);
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);
  const user =  useSelector((state: reduxData) => state.userReducer);
  const [locationCode, setLocationCode] = useState<String | null>('');
  const [errorLocationCode, setErrorLocationCode] = useState('');
  const [quantity, setQuantity] = useState<number | null>(null); // State for quantity
  const [errorQuantity, setErrorQuantity] = useState(''); // State for quantity error
  const inputRef = useRef<TextInput>(null);

  const onCancel = () => {
    props.onClose();
  };


  const onChangeQuantity = (value: string) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setQuantity(numericValue);
      setErrorQuantity('');
    } else {
      setQuantity(null);
      setErrorQuantity('Please enter a valid number');
    }
  };

  const setPicking = () =>{
    Request(
      'patch',
      'delivery-notes-item-picking',
      {},
      {
        picker_id : user.id,
        quantity_picked : quantity,
        location_id : locationCode
      },
      [props.stock.id],
      onSuccess,
      onFailed
    )
  }

  const onSuccess = (response) => {
    console.log(response)
    props.onSuccess()
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'changed successfully',
    });
  }

  const onFailed = (error) => {
    console.log(error)
    props.onFailed()
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'Failed to change rental',
    });
  }

  useEffect(() => {
    if (props.visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.visible]);

  return (
    <Dialog isVisible={props.visible}>
      <Dialog.Title title={props.title} />
      <Divider />

      <View>
        {!props.stock.location_id && (
          <>
            <Text style={styles.textLabel}>Location Code :</Text>
            <SelectQuery
              urlKey={'locations-index'}
              args={[organisation.active_organisation.id, warehouse.id]}
              value={locationCode}
              onChange={e => setLocationCode(e.id)}
            />
            <Text style={{color: 'red', fontSize: 12}}>
              {errorLocationCode}
            </Text>
          </>
        )}

        {/* Quantity Field */}
        <Text style={styles.textLabel}>Quantity :</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={quantity !== null ? quantity.toString() : ''}
            onChangeText={onChangeQuantity}
          />
        </View>
        <Text style={{color: 'red', fontSize: 12}}>{errorQuantity}</Text>

        <Divider style={{marginTop: 20}} />
        <View style={styles.dialogButtonContainer}>
          <Button type="secondary" title="Cancel" onPress={onCancel} />
          <Button type="primary" title="Submit" onPress={setPicking} />
        </View>
      </View>
    </Dialog>
  );
}

ChangeLocation.defaultProps = {
  title: 'Picking',
  visible: false,
  onClose: () => null,
  onFailed: () => null,
  onSuccess: () => null,
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
    marginTop: 5,
  },
});

export default ChangeLocation;
