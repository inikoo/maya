import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Request } from '~/Utils';
import { useSelector } from 'react-redux';
import { Text, Divider, Icon, Dialog } from '@rneui/themed';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import Button from '~/Components/Button';
import { reduxData } from '~/Types/types';

type Props = {
  title?: React.ReactNode | string;
  visible: boolean;
  onClose: () => void;
  item: number | null | any;
  pallet: object | null;
  bulkMode?: boolean;
  onSuccess: () => void;
  onFailed: () => void;
};

const ChangeItem: React.FC<Props> = ({
  title = 'Change Pallet',
  visible = false,
  onClose = () => null,
  item,
  pallet,
  onSuccess = () => null,
  onFailed = () => null,
}) => {
  const [palletCode, setPalletCode] = useState<string | null>('');
  const [errorPalletCode, setErrorPalletCode] = useState<string>('');
  const [quantity, setQuantity] = useState<number | null>(0);
  const [errorQuantity, setErrorQuantity] = useState<string>('');
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);

  const organisation = useSelector((state: reduxData) => state.organisationReducer);
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);

  const getPalletCode = async () => {
    await Request(
      'get',
      'global-search-scanner',
      {},
      {type: 'Pallet'},
      [organisation.active_organisation.id, warehouse.id, palletCode],
      handlePalletCodeSuccess,
      handlePalletCodeFailed,
    );
  };

  const handlePalletCodeSuccess = async (response: any) => {
    if (response.data.model.id && response.data.model_type == 'Pallet') {
        await Request(
          'patch',
          'stored-item-pallet', 
          {},
          { quantity, pallet_id: response.data.model.id },
          [pallet.id, item.id],
          handleSuccess,
          handleFailed
      );
    }
  }

  const handlePalletCodeFailed = (error: any) => {
    setErrorPalletCode(error?.response?.status === 404 ? 'Cannot find pallet' : error?.response?.data?.message || 'Server error');
  };

  const handleSuccess = () => {
    onSuccess();
    onCancel();
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet location updated',
    });
  };

  const handleFailed = (error: any) => {
    console.log('ddddf',error)
    onFailed();
    onCancel();
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response?.data?.message || 'Failed to update pallet location',
    });
  };

  const onCancel = () => {
    onClose();
    setPalletCode('');
    setErrorPalletCode('');
    setQuantity(0);
    setErrorQuantity('');
  };

  const onChangeQuantity = (value: string) => {
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) {
      setErrorQuantity('Invalid quantity');
    } else if (numericValue < minQuantity) {
      setErrorQuantity(`Quantity cannot be less than ${minQuantity}`);
    } else if (numericValue > maxQuantity) {
      setErrorQuantity(`Quantity cannot be more than ${maxQuantity}`);
    } else {
      setErrorQuantity('');
      setQuantity(numericValue);
    }
  };

  useEffect(() => {
    setQuantity(0);
    setMaxQuantity(pallet?.stored_items_quantity || 0);
  }, [pallet]);

  return (
    <Dialog isVisible={visible}>
      <Dialog.Title title={title} />
      <Divider />
      <View>
        <Text style={styles.textLabel}>Pallet Code:</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Code"
            value={palletCode || ''}
            onChangeText={setPalletCode}
          />
          <TouchableOpacity style={styles.scanButton}>
            <Icon name="qr-code-scanner" type="material" size={25} />
          </TouchableOpacity>
        </View>
        {errorPalletCode && <Text style={styles.errorText}>{errorPalletCode}</Text>}

        <Text style={styles.textLabel}>Quantity:</Text>
        <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          keyboardType="numeric"
          value={quantity?.toString() || ''}
          onChangeText={onChangeQuantity}
        />
        </View>
        {errorQuantity && <Text style={styles.errorText}>{errorQuantity}</Text>}
      </View>

      <Divider style={{ marginTop: 20 }} />
      <View style={styles.dialogButtonContainer}>
        <Button type="secondary" title="Cancel" onPress={onCancel} />
        <Button type="primary" title="Submit" onPress={getPalletCode} />
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialogButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  scanButton: {
    marginLeft: 10,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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

export default ChangeItem;
