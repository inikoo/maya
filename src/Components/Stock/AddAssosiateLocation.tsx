import React, {useState, ReactNode} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {Text, Divider, Icon, Dialog} from '@rneui/themed';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import Button from '~/Components/Button';


type Props = {
    title: ReactNode | String;
    visible : Boolean,
    onClose : Function,
    onSuccess : Function,
    onFailed : Function
    data?: Object|null
  };

function AssociateLocation(props : Props) {
  const navigation = useNavigation();
  const [locationCode, setLocationCode] = useState(null);
  const [errorLocationCode, setErrorLocationCode] = useState('');

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
              onPress={() => navigation.navigate('Change Location Pallet Scanner', {pallet: props.pallet})}
            >
              <Icon name="qr-code-scanner" type="material" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{color: 'red', fontSize: 12}}>{errorLocationCode}</Text>
        <Divider style={{marginTop: 20}} />
        <View style={styles.dialogButtonContainer}>
          <Button type="secondary" title="Cancel" onPress={onCancel} />
          <Button type="primary" title="Submit"  />
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
