import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList';
import {Action} from '~/Store';
import {Avatar, Icon, Text} from '@rneui/themed'; // Import Icon from your icon library
import { COLORS, MAINCOLORS } from '~/Utils/Colors';

const Warehouse = (porps) => {
  const dispatch = useDispatch();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  const setSelectedWarehouse = data => {
    dispatch(Action.CreateWarehouseProperties(data));
  };

  const Item = (record,{onLongPress , listModeBulk, bulkValue}) => {
    return (
      <TouchableOpacity
        style={styles.container}  onLongPress={()=>onLongPress(record)}
        onPress={() => listModeBulk ? onLongPress(record) : setSelectedWarehouse(record)}>
        <View style={{...styles.row,backgroundColor: !bulkValue.includes(record.id) ? 'white' : COLORS.grey7}}>
          <Avatar
            size={40}
            icon={{name: 'warehouse', type: 'material-community-icons', color:MAINCOLORS.white}}
            containerStyle={{ backgroundColor: MAINCOLORS.primary, marginRight: 13}}
          />
          <View style={styles.row}>
            <View style={styles.text}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {record.code} - {record.name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.description}>
                  Locations : {record.number_locations}
                </Text>
                <Text style={styles.description}>
                  Warehouse Areas : {record.number_warehouse_areas}
                </Text>
              </View>
            </View>
            {warehouse.id == record.id && (
              <Icon
                name="check-circle"
                type="material-icons"
                color="#00FF00"
                size={20}
                style={{marginLeft: 30 }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <BaseList
        urlKey="warehouse-index"
        args={[organisation.active_organisation.id]}
        renderItem={Item}
        navigation={porps.navigation}
        scanner={false}
        title='Warehouses'
      />
    </View>
  );
};

export default Warehouse;

const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    borderWidth : 1,
    borderColor : COLORS.grey5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: MAINCOLORS.primary,
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
});
