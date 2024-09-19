import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Request } from '~/Utils';
import { useSelector } from 'react-redux';
import { Text, Divider, Dialog } from '@rneui/themed';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';
import Button from '~/Components/Button';
import SelectQuery from '~/Components/Selectquery';
import { reduxData } from '~/types/types';
import { Daum } from '~/types/indexDeliveryNoteItems';

type Props = {
  title?: string;
  visible: boolean;
  stock: Daum,
  onClose: () => void;
  onSuccess: () => void;
  onFailed: () => void;
  formType: 'default' | 'deleteQuantity' | 'location';
};

function ChangeLocation({ title, visible, stock, onClose, onSuccess, onFailed, formType } : Props) {
  const organisation = useSelector((state: reduxData) => state.organisationReducer);
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);
  const user = useSelector((state: reduxData) => state.userReducer);

  const [locationCode, setLocationCode] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [quantityRemoved, setQuantityRemoved] = useState<number | null>(null);
  const [errorLocationCode, setErrorLocationCode] = useState('');
  const [errorQuantity, setErrorQuantity] = useState('');

  const inputRef = useRef<TextInput>(null);

  const resetForm = () => {
    setLocationCode(null);
    setQuantity(null);
    setQuantityRemoved(null);
    setErrorLocationCode('');
    setErrorQuantity('');
  };

  const validateQuantity = (value: string, max: number) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      return Math.min(numericValue, max);
    }
    return null;
  };

  const onChangeQuantity = (value: string) => {
    const validQuantity = validateQuantity(value, stock.quantity_required);
    setQuantity(validQuantity);
    setErrorQuantity(validQuantity !== null ? '' : 'Please enter a valid number');
  };

  const onChangeRemoveQuantity = (value: string) => {
    const validRemovedQuantity = validateQuantity(value, stock.quantity_picked);
    setQuantityRemoved(validRemovedQuantity);
    setErrorQuantity(validRemovedQuantity !== null ? '' : 'Please enter a valid number');
  };

  const setDataFormValidation = () => {
    const baseData = { picker_id: user.id, location_id: locationCode };
    switch (formType) {
      case 'default':
        return { ...baseData, quantity_picked: quantity };
      case 'deleteQuantity':
        return { quantity_removed: quantityRemoved };
      case 'location':
        return baseData;
      default:
        return {};
    }
  };

  const setPicking = () => {
    const data = setDataFormValidation();
    console.log(data);
    // Uncomment this section to perform the actual request
    Request(
      'patch',
      'delivery-notes-item-picking',
      {},
      data,
      [stock.id],
      onSuccessCallback,
      onFailedCallback
    ); 
  };

  const onSuccessCallback = (response : any) => {
    onSuccess();
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Changed successfully',
    });
  };

  const onFailedCallback = (error : any ) => {
    onFailed();
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response?.data?.message || 'Failed to change rental',
    });
  };

  const renderForm = () => {
    switch (formType) {
      case 'default':
        return (
          <>
            {!stock.location_id && (
              <>
                <Text style={styles.textLabel}>Location Code:</Text>
                <SelectQuery
                  urlKey={'locations-index'}
                  args={[organisation.active_organisation.id, warehouse.id]}
                  value={locationCode}
                  onChange={(e) => setLocationCode(e.id)}
                />
                <Text style={styles.errorText}>{errorLocationCode}</Text>
              </>
            )}
            <Text style={styles.textLabel}>Quantity:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                keyboardType="numeric"
                value={quantity !== null ? quantity.toString() : ''}
                onChangeText={onChangeQuantity}
              />
            </View>
            <Text style={styles.errorText}>{errorQuantity}</Text>
          </>
        );
      case 'deleteQuantity':
        return (
          <>
            <Text style={styles.textLabel}>Quantity Removed:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                keyboardType="numeric"
                value={quantityRemoved !== null ? quantityRemoved.toString() : ''}
                onChangeText={onChangeRemoveQuantity}
              />
            </View>
            <Text style={styles.errorText}>{errorQuantity}</Text>
          </>
        );
      case 'location':
        return (
          <>
            <Text style={styles.textLabel}>Location Code:</Text>
            <SelectQuery
              urlKey={'locations-index'}
              args={[organisation.active_organisation.id, warehouse.id]}
              value={locationCode}
              onChange={(e) => setLocationCode(e.id)}
            />
            <Text style={styles.errorText}>{errorLocationCode}</Text>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (visible) {
      resetForm();
      if (inputRef.current) {
        inputRef.current.focus();
      }
      setLocationCode(stock?.location_id);
    }
  }, [visible, stock.location_id]);

  return (
    <Dialog isVisible={visible}>
      <Dialog.Title title={title} />
      <Divider />
      <View>
        {renderForm()}
        <Divider style={styles.divider} />
        <View style={styles.dialogButtonContainer}>
          <Button type="secondary" title="Cancel" onPress={onClose} />
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
  formType: 'default',
};

const styles = StyleSheet.create({
  dialogButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  divider: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  textLabel: {
    fontWeight: '500',
    marginTop: 5,
  },
});

export default ChangeLocation;
