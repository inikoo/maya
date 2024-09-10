import React, {useState, useRef} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {Icon, Dialog} from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '~/Utils/Colors';
import { reduxData, PalletTypesIndex, PropsScreens, BaseListTypes, PalletDetailTypes } from '~/Types/types';
import {findColorFromAiku} from '~/Utils';
import { Datum } from '~/Utils/StoredItemTypes'

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
import { ListItemAccordion } from '@rneui/base/dist/ListItem/ListItem.Accordion';


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

const StoredItems = (props : PropsScreens) => {
  const navigation = useNavigation()
  const organisation = useSelector((state : reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);
  const _baseList = useRef<BaseListTypes | null>(null);

  const item = ( record : Datum , {onLongPress = () => null, listModeBulk = false, bulkValue = []}) => {
        return(
          <View style={{...styles.container, backgroundColor: 'white'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Item', {item: record})}>
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{record.reference}</Text>
                <View style={{marginTop: 5, flexDirection: 'row'}}>
                  <Text style={{...styles.description, marginRight : 3}}>
                    customer : {record.customer_name}
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
        )
  }

 
  const refershList = () =>{
    if (_baseList.current) _baseList.current.refreshList();
  }

  return (
    <>
      <BaseList
        title="Stored Items"
        itemKey="id"
        prefix="pallets"
        urlKey="stored-item-index"
        sortSchema="reference"
        screenNavigation={'Pallet Scanner'}
        useScan={false}
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
        itemList={item}
        args={[
          organisation.active_organisation.id,
          warehouse.id,
        ]}
      />
    </>
  );
};

export default StoredItems;

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
});
