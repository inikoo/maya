import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Text, Icon, Card} from '@rneui/themed';
import {reduxData, PropsScreens} from '~/types/types';
import { Daum } from '~/types/indexWarehouseArea'
import {COLORS} from '~/Utils/Colors';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faInventory } from 'assets/fa/pro-light-svg-icons';

const IndexArea = (props: PropsScreens) => {
  const navigation = useNavigation();
  const organisation = useSelector((state: reduxData) => state.organisationReducer);
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);


  const Item = (record : Daum) => {
    return (
      <View style={{...styles.container, backgroundColor: 'white'}}>
        <TouchableOpacity>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{record.code}</Text>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                <Text style={{...styles.description, marginRight : 3}}>
                  Location : {record.number_locations}
                </Text>
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
            onPress={()=> navigation.navigate('WarehouseAreaLocation',{area : item})}
            style={styles.editButton}>
            <FontAwesomeIcon icon={faInventory} color="#ffffff" size={25}/>
          </TouchableOpacity>
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
        useScan={false}
        hiddenItem={renderHiddenItem}
        itemList={Item}
        title="WareHouse Area"
        itemKey="code"
        urlKey="warehouse-area-index"
        args={[organisation.active_organisation.id, warehouse.id]}
        enableSwipe={true}
        sortSchema="code"
        leftOpenValue={0}
        rightOpenValue={-60}
        screenNavigation={'Location Scanner'}
      />
    </>
  );
};

export default IndexArea;

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
