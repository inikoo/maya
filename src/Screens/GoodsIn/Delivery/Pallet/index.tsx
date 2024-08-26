import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import BaseList from '~/Components/BaseList/IndexV2';
import PalletCard from '~/Components/palletComponents/ListCard';
import ChangeLocation from '~/Components/ChangeLocationPallet';
import {Request} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import AbsoluteButton from '~/Components/absoluteButton';
import {Icon, ListItem} from '@rneui/themed';
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
  faUndoAlt,
  faShare,
  faCheck,
  faCheckDouble,
  faSpellCheck,
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
  faUndoAlt,
  faSpellCheck,
  faShare,
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
  const [bulkMode, setBlukMode] = useState(false);
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
    Request(
      'patch',
      'set-pallet-not-reiceved',
      {},
      {},
      [pallet.id],
      onSuccessChangeStatus,
      onFailedChangeStatus,
    );
  };

  const onSuccessChangeStatus = res => {
    if (_baseList.current) _baseList.current.refreshList();
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'success change status',
    });
    console.log(res);
  };

  const onFailedChangeStatus = error => {
    console.log(error);
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

  const sendUndoToServer = pallet => {
    Request(
      'patch',
      'set-pallet-undo',
      {},
      {},
      [pallet.id],
      onSuccessUndo,
      onFailedUndo,
    );
  };

  const onSuccessUndo = res => {
    console.log('ss',res)
    if (_baseList.current) _baseList.current.refreshList();
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'success change status',
    });
    console.log(res);

  };

  const onFailedUndo = error => {
    console.log(error);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to change status',
    });
  };

  const setUndoNotRecieved = pallet => {
    Alert.alert('', 'Are you sure to undo pallet status ?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
      },
      {text: 'Yes', onPress: () => sendUndoToServer(pallet)},
    ]);
  };

  const renderHiddenItem = item => {
    return (
      <View style={styles.hiddenItemContainer}>
        {item.state == 'not-received' ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setUndoNotRecieved(item)}>
            <FontAwesomeIcon icon={faUndoAlt} size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={() => setNotRecived(item)}>
            <FontAwesomeIcon icon={faTimes} size={20} color="#fff" />
          </TouchableOpacity>
        )}

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

  const onSuccessChange = () => {
    if (_baseList.current) _baseList.current.refreshList();
  };

  const bulkMenu = (value: Array<any>) => {
    const buttonFeatures = [
      {
        icon: faInventory,
        key: 'set-location',
        title: 'Set Location',
        onPress: () => {
          setOpenLocation(true), setBlukMode(true);
        },
      },
      {
        icon: faBetamax,
        key: 'set-rental',
        title: 'Set Rental',
        onPress: () => {
          setOpenRentals(true), setBlukMode(true);
        },
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
          <ListItem key={i} onPress={l.onPress}>
            <FontAwesomeIcon icon={l.icon} size={18} />
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    );
  };

  const changeStatusDelivery = ({url = ''}) => {
    Request(
      'patch',
      url,
      {},
      {},
      [props.route.params.delivery.id],
      onSuccessChangeStatusDelivery,
      onFailedChangeStatusDelivery,
    );
  };

  const onSuccessChangeStatusDelivery = res => {
    console.log(res);
  };

  const onFailedChangeStatusDelivery = error => {
    console.log(error);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to change status',
    });
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
          height={550}
          args={[organisation.id, warehouse.id, delivery.id]}
          enableSwipe={delivery.state == 'booking-in' ? true : false}
          itemKey="id"
          sortSchema="reference"
          bulkMenu={(value: Array<any>) => bulkMenu(value)}
          title={`Pallets in ${delivery.reference}`}
          itemList={(
            record,
            {onLongPress = () => null, listModeBulk = false, bulkValue = []},
          ) => (
            <PalletCard
              data={{
                record: record,
                onLongPress,
                listModeBulk,
                bulkValue,
              }}
            />
          )}
        />
      )}

      {delivery?.state == 'confirmed' && (
        <View>
          <AbsoluteButton
            onPress={() =>
              changeStatusDelivery({url: 'delivery-status-recived'})
            }
            content={
              <TouchableOpacity>
                <FontAwesomeIcon icon={faCheck} size={30} color={'white'} />
                <Text style={{color: 'white', fontSize: 10}}>Recived</Text>
              </TouchableOpacity>
            }
          />
          <AbsoluteButton
            onPress={() =>
              changeStatusDelivery({url: 'delivery-status-not-recived'})
            }
            constainerStyle={{
              backgroundColor: MAINCOLORS.danger,
              height: 80,
              width: 80,
              borderRadius: 35,
            }}
            content={
              <TouchableOpacity>
                <FontAwesomeIcon
                  style={{marginLeft: 5}}
                  icon={faTimes}
                  size={28}
                  color={'white'}
                />
                <Text style={{color: 'white', fontSize: 10}}>Not Recived</Text>
              </TouchableOpacity>
            }
          />
        </View>
      )}

      {delivery?.state == 'received' && (
        <View>
          <AbsoluteButton
            onPress={() =>
              changeStatusDelivery({url: 'delivery-status-booking-in'})
            }
            content={
              <TouchableOpacity>
                <FontAwesomeIcon  style={{ marginLeft : 5}} icon={faCheck} size={28} color={'white'} />
                <Text style={{color: 'white', fontSize: 10}}>Booking in</Text>
              </TouchableOpacity>
            }
          />
        </View>
      )}

      {delivery?.state == 'booking-in' && (
        <View>
          <AbsoluteButton
            onPress={() =>
              changeStatusDelivery({url: 'delivery-status-booked-in'})
            }
            content={
              <TouchableOpacity>
                <FontAwesomeIcon
                  style={{ marginLeft : 5}}
                  icon={faCheckDouble}
                  size={28}
                  color={'white'}
                />
                <Text style={{color: 'white', fontSize: 10}}>Booked in</Text>
              </TouchableOpacity>
            }
          />
        </View>
      )}

      <ChangeLocation
        visible={openLocation}
        onClose={() => {
          setOpenLocation(false), setBlukMode(false);
        }}
        pallet={
          bulkMode && _baseList.current
            ? _baseList.current.bulkValue
            : selectedPallet.id
        }
        bulk={bulkMode}
        onSuccess={onSuccessChange}
      />
      <ChangeRentals
        visible={openRentals}
        onClose={() => {
          setOpenRentals(false), setBlukMode(false);
        }}
        pallet={
          bulkMode && _baseList.current
            ? _baseList.current.bulkValue
            : selectedPallet.id
        }
        bulk={bulkMode}
        onSuccess={onSuccessChange}
        value={selectedPallet.rental_id}
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
    padding: 15,
    alignContent: 'center',
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
