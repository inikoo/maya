import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Text, Icon} from '@rneui/themed';
import {COLORS} from '~/Utils/Colors';
import {reduxData, PropsScreens} from '~/Types/types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { Daum } from '~/Types/IndexArea'
import {faInventory} from 'assets/fa/pro-regular-svg-icons';

library.add(
  faInventory,
);


const WarehouseArea = (props: PropsScreens) => {
  const navigation = useNavigation();
  const organisation = useSelector((state: reduxData) => state.organisationReducer);
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);


  const Item = (record: Daum) => {
    return (
      <TouchableOpacity
      /*   onPress={() => navigation.navigate('Area', {area: record})} */
        style={{ ...styles.container}}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{record.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHiddenItem = (item : Daum) => {
    return (
      <View style={styles.hiddenItemContainer}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Location in area', { area : item })}
            style={styles.editButton}>
            <FontAwesomeIcon icon={faInventory} size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <BaseList
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
        itemList={Item}
        enableSwipe={true}
        useScan={false}
        hiddenItem={renderHiddenItem}
        title="WareHouse Area"
        itemKey="code"
        urlKey="warehouse-area-index"
        args={[organisation.active_organisation.id, warehouse.id]}
        sortSchema="code"
      />
    </>
  );
};

export default WarehouseArea;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: COLORS.grey6,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
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
  leftIconContainer: {
    marginRight: 18,
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
});
