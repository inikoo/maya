import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import {Text, Divider, Dialog} from '@rneui/themed';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import Button from '~/Components/Button';
import {Dropdown} from 'react-native-element-dropdown';
import {Request} from '~/Utils';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faCheck} from 'assets/fa/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

library.add(faCheck);

const options = [
  {
    label: 'Damaged',
    value: 'damaged',
  },
  {
    label: 'Lost',
    value: 'lost',
  },
  {
    label: 'Other Incident',
    value: 'other-incident',
  },
];

type Props = {
  title?: ReactNode;
  visible?: Boolean;
  onClose?: Function;
  pallet?: Object;
  bulk?: boolean;
  onSuccess?: Function;
  onFailed?: Function;
  value?: any;
};

type Item = {
  label : String,
  value : any
}

function SetNotPicked(props: Props) {
  const [valueStatus, setValueStatus] = useState(props.value);
  const [valueDescription, setValueDescription] = useState();
  const [errorStatus, setErrorStatus] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  const renderItem = (item : Item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === valueStatus && (
          <FontAwesomeIcon style={styles.icon} icon={faCheck} size={20} />
        )}
      </View>
    );
  };

  const onChangeStatus = () => {
    Request(
      'patch',
      'set-pallet-pallet-and-stored-item-not-picked',
      {},
      {state : valueStatus, notes : valueDescription},
      [props.pallet],
      onSuccessChangeStatus,
      onFailedChangeStatus,
    );
  };

  const onSuccessChangeStatus = (response : any) => {
    props.onSuccess(response.data);
    onCancel();
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Rental changed successfully',
    });
  };

  const onFailedChangeStatus = (error : any) => {
    props.onFailed(error);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'Failed to change rental',
    });
  };

  const onCancel = () => {
    setValueStatus(null);
    setErrorStatus('');
    props.onClose();
  };

  useEffect(() => {
    setValueStatus(null);
  }, [props.pallet]);

  return (
    <Dialog isVisible={props.visible}>
      <Dialog.Title title={props.title} />
      <Divider />
      <View>
        <Text style={styles.textLabel}>Status</Text>
        <View style={styles.searchContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={options}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={valueStatus}
            onChange={item => {
              setValueStatus(item.value);
            }}
            renderItem={renderItem}
          />
        </View>
        <Text style={{color: 'red', fontSize: 12}}>{errorStatus}</Text>
      </View>

      <View>
        <Text style={styles.textLabel}>Notes</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Description"
            numberOfLines={4}
            multiline
            textAlignVertical="top"
            value={valueDescription}
            onChangeText={(text: String) => setValueDescription(text)}
          />
        </View>
        <Text style={{color: 'red', fontSize: 12}}>{errorDescription}</Text>
      </View>

      <Divider style={{marginTop: 20}} />
      <View style={styles.dialogButtonContainer}>
        <Button type="secondary" title="Cancel" onPress={onCancel} />
        <Button type="primary" title="Submit" onPress={onChangeStatus} />
      </View>
    </Dialog>
  );
}

SetNotPicked.defaultProps = {
  title: 'Not Picked',
  visible: false,
  onClose: () => null,
  onSuccess: () => null,
  onFailed: () => null,
  value: null,
  pallet: null
};

const styles = StyleSheet.create({
  dialogButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  textLabel: {
    fontWeight: '500',
    marginTop: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    flex: 1,
    minHeight: 80, // Adjust the minimum height as needed
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    padding: 3,
  },
});

export default SetNotPicked;
