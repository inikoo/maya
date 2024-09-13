import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Text, Icon, Card} from '@rneui/themed';
import {reduxData, PropsScreens} from '~/types/types';
import { Daum } from '~/types/indexWarehouseArea'

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faInventory
} from 'assets/fa/pro-light-svg-icons';

const IndexArea = (props: PropsScreens) => {
  const navigation = useNavigation();
  const organisation = useSelector((state: reduxData) => state.organisationReducer);
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);


  const Item = (record : Daum) => {
    return (
      <View style={{backgroundColor: '#ffffff'}}>
        <TouchableOpacity>
          <Card containerStyle={styles.cardStat}>
            <Text style={styles.labelStat}>{record.code}</Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHiddenItem = (item : Daum) => {
      return (
        <View style={styles.hiddenItemContainer}>
          <TouchableOpacity
            style={styles.editButton}>
            <FontAwesomeIcon icon={faInventory} color="#ffffff"  size={25}/>
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
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  leftIconContainer: {
    marginRight: 18,
  },
  cardStat: {
    borderRadius: 10,
    paddingVertical: 20,
    marginTop: 10,
    marginRight: 0,
    marginLeft: 0,
    backgroundColor: '#FAFAFA',
  },
  labelStat: {
    fontSize: 14,
    fontWeight: '700',
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
