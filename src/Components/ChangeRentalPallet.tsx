import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {Text, Divider, Dialog} from '@rneui/themed';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import Button from '~/Components/Button';
import {Dropdown} from 'react-native-element-dropdown';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faCheck} from 'assets/fa/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

library.add(faCheck);

type Props = {
  title: ReactNode;
  visible: Boolean;
  onClose: Function;
  pallet: Object;
  bulk: boolean;
  onSuccess: Function;
  onFailed: Function;
  value: any;
};

function ChangeRentals(props: Props) {
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [value, setValue] = useState(props.bulk ? null : props.value);
  const [options, setOptions] = useState([]);
  const [errorLocationCode, setErrorLocationCode] = useState('');

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        {item.id === value && (
          <FontAwesomeIcon style={styles.icon} icon={faCheck} size={20} />
        )}
      </View>
    );
  };

  const getOptions = () => {
    Request(
      'get',
      'rentals-index',
      {},
      {},
      [
        organisation.active_organisation.id,
        organisation.active_organisation.active_authorised_fulfilments.id,
      ],
      onSuccessGetOptions,
      onFailedGetOptions,
    );
  };

  const onSuccessGetOptions = response => {
    setOptions(response.data);
  };

  const onFailedGetOptions = error => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'Failed to get rental options',
    });
  };

  const onRentalChange = () => {
    Request(
      'patch',
      'set-pallet-rental',
      {},
      {rental_id: value},
      [props.pallet],
      onSuccessChangeRental,
      onFailedChangeRental,
    );
  };

  const onSuccessChangeRental = response => {
    props.onSuccess();
    onCancel();
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Rental changed successfully',
    });
  };

  const onFailedChangeRental = error => {
    props.onFailed();
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'Failed to change rental',
    });
  };

  const onCancel = () => {
    setValue(props.bulk ? null : props.value);
    setErrorLocationCode('');
    props.onClose();
  };

  useEffect(() => {
    setValue(props.bulk ? null : props.value);
    getOptions()
  }, [props.pallet]);

  return (
    <Dialog isVisible={props.visible}>
      <Dialog.Title title={props.title} />
      <Divider />
      <View>
        <Text style={styles.textLabel}>Rentals</Text>
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
            labelField="name"
            valueField="id"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.id);
            }}
            renderItem={renderItem}
          />
        </View>
        <Text style={{color: 'red', fontSize: 12}}>{errorLocationCode}</Text>
        <Divider style={{marginTop: 20}} />
        <View style={styles.dialogButtonContainer}>
          <Button type="secondary" title="Cancel" onPress={onCancel} />
          <Button type="primary" title="Submit" onPress={onRentalChange} />
        </View>
      </View>
    </Dialog>
  );
}

ChangeRentals.defaultProps = {
  title: 'Change Rentals',
  visible: false,
  onClose: () => null,
  onSuccess: () => null,
  onFailed: () => null,
  value: null,
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
    width: '100%',
    gap: 3,
  },
  textLabel: {
    fontWeight: '500',
    marginTop: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
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
});

export default ChangeRentals;
