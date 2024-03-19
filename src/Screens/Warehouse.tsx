import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS} from '~/Constant/Color';
import {Avatar, Card, Badge} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import BaseList from '~/Components/Base/BaseList'
import { get } from 'lodash'
import { Action } from '~/Store';


const Warehouse = () => {
  const dispatch = useDispatch();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  console.log('warehouse',warehouse)
  
  const setSelectedWarehouse = data => {
    dispatch(Action.CreateWarehouseProperties(data));
  };


  const Item = ({ item, index }) => {
    return (
      <Card style={styles.card} onPress={() => setSelectedWarehouse(item)}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.avatarTitleContainer}>
            <Avatar.Icon icon="barn" style={styles.avatarStyle} size={50} />
            <View style={styles.cardSubtitleContainer}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>
                Warehouse areas: {item.number_warehouse_areas}
              </Text>
              <Text style={styles.cardSubtitle}>
                Locations: {item.number_locations}
              </Text>
            </View>
          </View>
          {get(warehouse,['id']) == item.id && (
            <Badge style={styles.badge} size={24}>
              Selected
            </Badge>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View>
       <BaseList urlKey='warehouse-index' args={[organisation.active_organisation.id]} renderItem={Item}/>
    </View>
  );
};

export default Warehouse;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffff',
  },
  cardContent: {
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  avatarTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.black,
    marginHorizontal: 10,
  },
  avatarStyle: {
    backgroundColor: COLORS.primary,
  },
  cardSubtitleContainer: {
    padding: 10,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#87D068', // Change the background color as needed
  },
});
