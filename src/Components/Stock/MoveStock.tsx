import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Dialog, Text, Divider, Icon} from '@rneui/themed';
import Button from '~/Components/Button';

type Props = {
  title: ReactNode;
  visible: Boolean;
  onClose: Function;
  onSuccess: Function;
  onFailed: Function;
};

function StockCheck(props: Props) {
  const [locationCode, setLocationCode] = useState('');
  const [errorLocationCode, setErrorLocationCode] = useState('');

  const onCancel = () => {
    props.onClose();
  };

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
              value={locationCode}
              onChangeText={setLocationCode}
              keyboardType="numeric"
            />
          </View>
        </View>
        <Text style={styles.errorText}>{errorLocationCode}</Text>
        </View>
        <View>
        <Text style={styles.textLabel}>Location Code : </Text>
        <View style={styles.searchContainer}>
        <View style={{...styles.inputContainer, width : '80%'}}>
            <TextInput
              style={styles.input}
              placeholder="Code"
              value={locationCode}
         
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
        <Text style={{color: 'red', fontSize: 12}}>{errorLocationCode}</Text>

        </View>
       
        <Divider style={{marginTop: 20}} />
        <View style={styles.dialogButtonContainer}>
          <Button type="secondary" title="Cancel" onPress={onCancel} />
          <Button type="primary" title="Submit" />
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
