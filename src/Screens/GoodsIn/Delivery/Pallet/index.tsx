import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import BaseList from '~/Components/BaseList/IndexV2';
import PalletCard from '~/Components/palletComponents/ListCardDelivery';
import ChangeLocation from '~/Components/ChangeLocationPallet';
import {Request} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import AbsoluteButton from '~/Components/absoluteButton';
import {ListItem} from '@rneui/themed';
import ChangeRentals from '~/Components/ChangeRentalPallet';
import {reduxData, BaseListTypes} from '~/types/types';
import {Data} from '~/types/indexShowDelivery';
import {Daum} from '~/types/indexPalletinDelivery';

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

type Props = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      delivery: Data;
    };
    path: string;
  };
};

const DeliveryPallet = (props: Props) => {
  const navigation = useNavigation();
  const organisation = useSelector(
    (state: reduxData) => state.organisationReducer.active_organisation,
  );
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);
  const [openLocation, setOpenLocation] = useState<Boolean>(false);
  const [openRentals, setOpenRentals] = useState<Boolean>(false);
  const [selectedPallet, setSelectedPallet] = useState<Daum | null>(null);
  const [loadingButton, setLoadingButton] = useState<Boolean>(false);
  const [bulkMode, setBlukMode] = useState<Boolean>(false);
  const _baseList = useRef<BaseListTypes | null>(null);
  const delivery = props.route.params?.delivery;

  useEffect(() => {
    if (!delivery) {
      navigation.goBack();
    }
  }, [delivery, navigation]);

  const onChangeLocation = (pallet: Daum) => {
    setSelectedPallet(pallet);
    setOpenLocation(true);
  };

  const onChangeRentals = (pallet: Daum) => {
    setSelectedPallet(pallet);
    setOpenRentals(true);
  };

  const sendNotReciveToServer = (pallet: Daum) => {
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

  const onSuccessChangeStatus = () => {
    if (_baseList.current) _baseList.current.refreshList();
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'success change status',
    });
  };

  const onFailedChangeStatus = (error : any) => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to change status',
    });
  };

  const setNotRecived = (pallet : Daum) => {
    Alert.alert(
      'Confrim not Recived',
      'Are you sure to set pallet not recieved ?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => sendNotReciveToServer(pallet)},
      ],
      {cancelable: true},
    );
  };

  const sendUndoToServer = (pallet : Daum) => {
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

  const onSuccessUndo = () => {
    if (_baseList.current) _baseList.current.refreshList();
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'success change status',
    });
  };

  const onFailedUndo = (error : any) => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to change status',
    });
  };

  const setUndoNotRecieved = (pallet: Daum) => {
    Alert.alert(
      'Undo Pallet !',
      'Are you sure to undo pallet status ?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
        },
        {text: 'Yes', onPress: () => sendUndoToServer(pallet)},
      ],
      {cancelable: true},
    );
  };

  const renderHiddenItem = (item: Daum) => {
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
    setLoadingButton(true);
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

  const onSuccessChangeStatusDelivery = () => {
    setLoadingButton(false);
    navigation.navigate('Delivery', {delivery: delivery});
    if (_baseList.current) _baseList.current.refreshList();
  };

  const onFailedChangeStatusDelivery = (error: any) => {
    setLoadingButton(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to change status',
    });
  };

  return (
    <>
      <BaseList
        ref={_baseList}
        headerProps={{
          useLeftIcon: true,
        }}
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
        bulkMenu={bulkMenu}
        title={`Pallets in ${delivery.reference}`}
        itemList={(
          record: Daum,
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

      {delivery?.state == 'confirmed' && (
        <View>
          <AbsoluteButton
            loading={loadingButton}
            onPress={() =>
              changeStatusDelivery({url: 'delivery-status-recived'})
            }
            content={
              <View>
                <FontAwesomeIcon icon={faCheck} size={30} color={'white'} />
                <Text style={{color: 'white', fontSize: 10}}>Recived</Text>
              </View>
            }
          />
        </View>
      )}

      {delivery?.state == 'received' && (
        <View>
          <AbsoluteButton
            loading={loadingButton}
            onPress={() =>
              changeStatusDelivery({url: 'delivery-status-booking-in'})
            }
            content={
              <View>
                <FontAwesomeIcon
                  style={{marginLeft: 5}}
                  icon={faCheck}
                  size={28}
                  color={'white'}
                />
                <Text style={{color: 'white', fontSize: 10}}>Booking in</Text>
              </View>
            }
          />
        </View>
      )}

      {delivery?.state == 'booking-in' && (
        <View>
          <AbsoluteButton
            loading={loadingButton}
            onPress={() =>
              changeStatusDelivery({url: 'delivery-status-booked-in'})
            }
            content={
              <View>
                <FontAwesomeIcon
                  style={{marginLeft: 5}}
                  icon={faCheckDouble}
                  size={28}
                  color={'white'}
                />
                <Text style={{color: 'white', fontSize: 10}}>Booked in</Text>
              </View>
            }
          />
        </View>
      )}

      <ChangeLocation
        visible={openLocation}
        onClose={() => { setOpenLocation(false), setBlukMode(false) }}
        pallet={
          bulkMode && _baseList.current
            ? _baseList.current.bulkValue
            : selectedPallet?.id
        }
        bulkMode={bulkMode}
        onSuccess={onSuccessChange}
      />

      <ChangeRentals
        visible={openRentals}
        onClose={() => {
          setOpenRentals(false), 
          setBlukMode(false);
        }}
        pallet={
          bulkMode && _baseList.current
            ? _baseList.current.bulkValue
            : selectedPallet?.id
        }
        bulk={bulkMode}
        onSuccess={onSuccessChange}
        value={selectedPallet?.rental_id}
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
