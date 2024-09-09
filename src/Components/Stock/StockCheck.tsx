import React, { useState, useEffect, ReactNode } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Dialog, Text, Divider } from '@rneui/themed';
import Button from '~/Components/Button';
import {Request} from '~/Utils';
import { reduxData, Location2 } from '~/Utils/types';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

type Props = {
  title: ReactNode;
  visible: Boolean;
  onClose: Function;
  onSuccess: Function;
  onFailed: Function;
  data: Location2
  stockId : Number|any
};

function StockCheck(props: Props) {
  const [Value, setValue] = useState(String(props?.data?.quantity));
  const [errorValue, setErrorValue] = useState('');

  const SetAudit = async () => {
    await Request(
      'patch',
      'org-stock-audit-location',
      {},
      {quantity : Value},
      [props.data.id],
      auditSuccess,
      auditFailed,
    );
  };

  const auditSuccess = (response : any) =>{
    props.onClose();
    props.onSuccess()
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Success audit',
    });
  }

  const auditFailed = (error : any) =>{
    props.onClose();
    props.onFailed()
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'Failed audit',
    });
  }

  const onCancel = () => {
    props.onClose();
  };

  useEffect(() => {
    setValue(String(props?.data?.quantity));
  }, [props.visible]);

  return (
    <Dialog isVisible={props.visible}>
      <Dialog.Title title={props.title} />
      <Divider />
      <View>
        <Text style={styles.textLabel}>Stock:</Text>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Code"
              value={Value}
              onChangeText={(text) => setValue(text)}
              keyboardType="numeric"
            />
          </View>
        </View>
        <Text style={styles.errorText}>{errorValue}</Text>
        <Divider style={{ marginTop: 20 }} />
        <View style={styles.dialogButtonContainer}>
          <Button type="secondary" title="Cancel" onPress={onCancel} />
          <Button type="primary" title="Submit" onPress={SetAudit}/>
        </View>
      </View>
    </Dialog>
  );
}

StockCheck.defaultProps = {
  title: 'Stock Check',
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
