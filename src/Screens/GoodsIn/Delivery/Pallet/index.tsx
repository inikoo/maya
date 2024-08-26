import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import BaseList from '~/Components/BaseList/IndexV2';
import PalletCard from '~/Components/palletComponents/ListCard';
import ChangeLocation from '~/Components/ChangeLocationPallet';
import {Request} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {
  Icon,
  ListItem,
} from '@rneui/themed';
import ChangeRentals from '~/Components/ChangeRentalPallet';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faInventory,
  faTruckCouch,
  faPallet,
  faSignOut,
  faBox,
  faTimes,
  faBetamax,
} from 'assets/fa/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

library.add(
  faInventory,
  faTruckCouch,
  faPallet,
  faSignOut,
  faBox,
  faTimes,
  faBetamax,
);

const DeliveryPallet = props => {
  const navigation = useNavigation(); // Get the navigation object
  const organisation = useSelector(
    state => state.organisationReducer.active_organisation,
  );
  const warehouse = useSelector(state => state.warehouseReducer);
  const delivery = props.route.params?.delivery; // Use optional chaining to safely access delivery
  const [openLocation, setOpenLocation] = useState(false);
  const [openRentals, setOpenRentals] = useState(false);
  const [selectedPallet, setSelectedPallet] = useState(false);
  const _baseList = useRef(null);

  // If delivery is not available, navigate back
  useEffect(() => {
    if (!delivery) {
      navigation.goBack();
    }
  }, [delivery, navigation]);

  const onChangeLocation = pallet => {
    setSelectedPallet(pallet);
    setOpenLocation(true);
  };

  const onChangeRentals = pallet => {
    setSelectedPallet(pallet);
    setOpenRentals(true);
  };

  const sendNotReciveToServer = pallet => {
    /*  Request(
      'patch',
      "url",
      {},
      {},
      [props.route.params.delivery.id],
      onSuccessChangeStatus,
      onFailedChangeStatus,
    ); */
  };

  const onSuccessChangeStatus = res => {
    if (_baseList.current) _baseList.current.refreshList();
  };

  const onFailedChangeStatus = error => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to change status',
    });
  };

  const setNotRecived = pallet => {
    Alert.alert('', 'Are you sure to set pallet not recieved ?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
      },
      {text: 'Yes', onPress: () => sendNotReciveToServer(pallet)},
    ]);
  };

  const renderHiddenItem = item => {
    return (
      <View style={styles.hiddenItemContainer}>
        <TouchableOpacity
          style={styles.dangerButton}
          onPress={() => setNotRecived(item)}>
          <FontAwesomeIcon icon={faTimes} size={20} color="#fff" />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 5}}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onChangeLocation(item)}>
            <FontAwesomeIcon icon={faInventory} size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onChangeRentals(item)}
            style={styles.editButton}>
            <FontAwesomeIcon icon={faBetamax} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };



  const bulkMenu = (value: Array<any>) => {
    const buttonFeatures = [
      {
        icon: faInventory,
        key: 'set-location',
        title: 'Set Location',
        onPress: () => setOpenLocation(true),
      },
      {
        icon: faBetamax,
        key: 'set-rental',
        title: 'Set Rental',
        onPress: () => setOpenRentals(true),
      },
      {
        icon: faTimes,
        key: 'not-recieved',
        title: 'Set to Not Recieved',
        onPress: () => null,
      },
    ];

    return (
      <View>
        {buttonFeatures.map((l, i) => (
          <ListItem
            key={i}
            onPress={l.onPress}>
              <FontAwesomeIcon icon={l.icon}  size={18} />
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    );
  };

  return (
    <>
      {delivery && (
        <BaseList
          ref={_baseList}
          urlKey="delivery-pallet-index"
          prefix="pallets"
          hiddenItem={renderHiddenItem}
          rightOpenValue={-120}
          leftOpenValue={80}
          args={[organisation.id, warehouse.id, delivery.id]}
          enableSwipe={true}
          itemKey="id"
          sortSchema='reference'
          bulkMenu={(value : Array<any> )=>bulkMenu(value)}
          title={`Pallets in ${delivery.reference}`}
          itemList={(record ,{onLongPress = ()=>null, listModeBulk = false, bulkValue = [] }) => (
            <PalletCard
              data={{
                record: record,
                onLongPress, 
                listModeBulk, 
                bulkValue
              }}
            />
          )}
        />
      )}
      <ChangeLocation
        visible={openLocation}
        onClose={() => setOpenLocation(false)}
        pallet={selectedPallet}
      />
      <ChangeRentals
        visible={openRentals}
        onClose={() => setOpenRentals(false)}
        pallet={selectedPallet}
      />
    </>
  );
};

export default DeliveryPallet;

const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignItems: 'center',
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  description: {
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hiddenItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    gap: 5,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  dangerButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});
