import React, {useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '~/Utils/Colors';
import {reduxData, PropsScreens, BaseListTypes} from '~/Types/types';
import {findColorFromAiku} from '~/Utils';
import {Daum} from '~/Types/StoredItemsPallet';
import ChangePalletStoredItems from '~/Components/ChangePalletStoredItems';

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
  faForklift,
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

const StoredItemsPallet = (props: PropsScreens) => {
  const navigation = useNavigation();
  const organisation = useSelector(
    (state: reduxData) => state.organisationReducer,
  );
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);
  const [visible, setVisible] = useState(false);
  const [selectedPallet, setSelectedPallet] = useState(null);
  const _baseList = useRef<BaseListTypes | null>(null);


  const item = (
    record: Daum,
    {onLongPress = () => null, listModeBulk = false, bulkValue = []},
  ) => {
    return (
      <View style={{...styles.container, backgroundColor: 'white'}}>
        <TouchableOpacity>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{record.reference}</Text>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                <Text style={{...styles.description, marginRight: 3}}>
                  Quantity : {record.stored_items_quantity}
                </Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <View style={styles.row}>
                <FontAwesomeIcon
                  icon={record.status_icon.icon}
                  size={20}
                  color={findColorFromAiku(record.status_icon.color)}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHiddenItem = (item : Daum) => {
    return (
      <View style={styles.hiddenItemContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setVisible(true)
            setSelectedPallet(item)
            }}>
          <FontAwesomeIcon icon={faForklift} size={26} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const refershList = () => {
    console.log('sdsd')
    if (_baseList.current) _baseList.current.refreshList();
  };

  return (
    <>
      <BaseList
        ref={_baseList}
        title={`Pallet Contained ${props.route.params.items.reference}`}
        itemKey="id"
        prefix="pallets"
        urlKey="stored-item-pallets"
        sortSchema="reference"
        useScan={false}
        enableSwipe={true}
        itemList={item}
        hiddenItem={renderHiddenItem}
        args={[
          organisation.active_organisation.id,
          warehouse.id,
          props.route.params.items.id,
        ]}
      />
      <ChangePalletStoredItems
        visible={visible}
        item={props.route.params.items}
        onClose={() => setVisible(false)}
        onSuccess={()=>refershList()}
        pallet={selectedPallet}
      />
    </>
  );
};

export default StoredItemsPallet;

const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.grey6,
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    marginHorizontal: 5,
  },
  description: {
    fontSize: 12,
    color: COLORS.grey6,
  },
  hiddenItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Ubah ke 'flex-end' untuk menempatkan item di ujung kanan
    paddingTop: 15,
    borderRadius: 10,
    marginVertical: 5,
  },

  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});
