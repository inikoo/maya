import React, {useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {Icon, Dialog} from '@rneui/themed';
import Information from '~/Components/palletComponents/Information';
import PalletCard from '~/Components/palletComponents/ListCardPallet';
import ChangeLocation from '~/Components/ChangeLocationPallet';
import SetChangeStatusNotPicked from '~/Components/SetChangeStatusPalletNotPicked';
import {
  reduxData,
  PalletTypesIndex,
  PropsScreens,
  BaseListTypes,
  PalletDetailTypes,
} from '~/Types/types';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
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
  faSpellCheck,
  faGhost,
} from 'assets/fa/pro-regular-svg-icons';

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
  faGhost,
);

const Pallet = (props: PropsScreens) => {
  const organisation = useSelector(
    (state: reduxData) => state.organisationReducer,
  );
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);
  const [openDialog, setOpenDialog] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const _baseList = useRef<BaseListTypes | null>(null);
  const [bulkMode, setBlukMode] = useState(false);
  const [selectedPallet, setSelectedPallet] = useState<PalletTypesIndex | null>(
    null,
  );
  const [openNotPickedDialog, setOpenNotPickedDialog] = useState(false);

  const setDialog = () => {
    setOpenDialog(!openDialog);
  };

  const renderHiddenItem = (item: PalletTypesIndex) => {
    return (
      <View style={styles.hiddenItemContainer}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <TouchableOpacity
            onPress={() => {
              setOpenLocation(true);
              setSelectedPallet(item);
            }}
            style={styles.editButton}>
            <FontAwesomeIcon icon={faInventory} size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpenNotPickedDialog(true);
              setSelectedPallet(item);
            }}
            style={styles.dangerButton}>
            <FontAwesomeIcon icon={faGhost} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const refershList = () => {
    if (_baseList.current) _baseList.current.refreshList();
  };

  return (
    <>
      <BaseList
        title="Pallets"
        itemKey="id"
        prefix="pallets"
        urlKey="pallet-index"
        sortSchema="reference"
        screenNavigation={'Pallet Scanner'}
        hiddenItem={renderHiddenItem}
        enableSwipe={true}
        rightOpenValue={-120}
        leftOpenValue={0}
        useBulk={true}
        headerProps={{
          useLeftIcon: true,
          leftIcon: (
            <TouchableOpacity
              style={styles.leftIconContainer}
              onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="bars" type="font-awesome-5" color="black" size={20} />
            </TouchableOpacity>
          ),
        }}
        args={[
          organisation.active_organisation.id,
          warehouse.id,
          organisation.active_organisation.active_authorised_fulfilments.id,
        ]}
        filterSchema={[
          {
            title: 'Status',
            key: 'pallets_elements[status]',
            type: 'checkBox',
            propsItem: {
              options: [
                {
                  label: 'Receiving',
                  value: 'receiving',
                },
                {
                  label: 'Not Received',
                  value: 'not-received',
                },
                {
                  label: 'Storing',
                  value: 'storing',
                },
                {
                  label: 'Returning',
                  value: 'return',
                },
                {
                  label: 'Returned',
                  value: 'returned',
                },
                {
                  label: 'Incident',
                  value: 'incident',
                },
              ],
            },
          },
        ]}
        itemList={(
          record: PalletTypesIndex,
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
      <Dialog isVisible={openDialog} onBackdropPress={setDialog}>
        <Dialog.Title title="Info" />
        <Information />
      </Dialog>

      <ChangeLocation
        visible={openLocation}
        onClose={() => {
          setOpenLocation(false), setBlukMode(false);
        }}
        onSuccess={refershList}
        pallet={
          bulkMode && _baseList.current
            ? _baseList.current.bulkValue
            : selectedPallet?.id
        }
        bulk={bulkMode}
      />

      <SetChangeStatusNotPicked
        pallet={
          bulkMode && _baseList.current
            ? _baseList.current.bulkValue
            : selectedPallet?.id
        }
        visible={openNotPickedDialog}
        onSuccess={refershList}
        onClose={() => setOpenNotPickedDialog(false)}
      />
    </>
  );
};

export default Pallet;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  leftIconContainer: {
    marginRight: 18,
  },
  notification: {
    width: 35,
    height: 35,
    padding: 5,
  },
  hiddenItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
