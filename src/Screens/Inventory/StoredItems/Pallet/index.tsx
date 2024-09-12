import React, {useState, useCallback, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {Icon} from '@rneui/themed';
import {COLORS} from '~/Utils/Colors';
import {findColorFromAiku} from '~/Utils';
import {Daum} from '~/types/indexStoredItemTypes';
import {reduxData} from '~/types/types';
import {Data} from '~/types/ShowStoredItemTypes';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ChangePalletStoredItem from '~/Components/ChangePalletStoredItem';

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
  faForklift,
);

type Props = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      item: Data;
    };
    path: string;
  };
};

const IndexStoredItems = (props: Props) => {
  const navigation = useNavigation();
  const _BaseList = useRef();
  const organisation = useSelector((state: reduxData) => state.organisationReducer);
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);
  const [changePalletVisible, setChangePalletVisible] = useState<Boolean>(false);
  const [selectedPallet, setSelectedPallet] = useState<Daum | null>(null); 


  const Item = (record: Daum) => {
    return (
      <View style={{...styles.container, backgroundColor: 'white'}}>
        <TouchableOpacity>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{record.reference}</Text>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                <Text style={{...styles.description, marginRight: 3}}>
                  items quantity : {record.stored_items_quantity}
                </Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <View style={styles.row}>
                <FontAwesomeIcon
                  icon={record.state_icon.icon}
                  size={20}
                  color={findColorFromAiku(record.state_icon.color)}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHiddenItem = (item: Data) => {
    return (
      <View style={styles.hiddenItemContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => {
          setSelectedPallet(item)
          setChangePalletVisible(true)
        }}>
          <FontAwesomeIcon icon={faForklift} color="#ffffff" size={30} />
        </TouchableOpacity>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (!props.route.params.item) navigation.goBack();
    }, [props.route.params.item]),
  );

  return (
    <>
      <BaseList
        ref={_BaseList}
        title="Stored Items"
        itemKey="id"
        useScan={false}
        prefix="pallets"
        urlKey="stored-item-pallet-contained"
        sortSchema="reference"
        screenNavigation={'Pallet Scanner'}
        itemList={Item}
        enableSwipe={true}
        hiddenItem={renderHiddenItem}
        args={[
          organisation.active_organisation.id,
          warehouse.id,
          props.route.params.item.id,
        ]}
      />
      <ChangePalletStoredItem
        visible={changePalletVisible}
        onClose={() => setChangePalletVisible(false)}
        pallet={selectedPallet}
        item={props.route.params.item}
      />
    </>
  );
};

export default IndexStoredItems;

const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
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
  leftIconContainer: {
    marginRight: 18,
  },
  description: {
    fontSize: 12,
    color: COLORS.grey6,
  },
  hiddenItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#FAFAFA',
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
