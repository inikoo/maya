import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Action} from '~/Store';
import { Icon, Text, FAB } from '@rneui/themed'; // Import Icon from your icon library
import { MAINCOLORS } from '~/Utils/Colors';
import Empty from '~/Components/Empty';
import { useNavigation } from '@react-navigation/native';

const Warehouse = (porps : Object) => {
  const dispatch = useDispatch();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const navigation = useNavigation()

  const setSelectedWarehouse = data => {
    dispatch(Action.CreateWarehouseProperties(data));
  };

  const renderItem = ({item}) => <Item data={item} />;

  const Item = (data : Object) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setSelectedWarehouse(data.data)}>
        <View style={styles.itemContent}>
          <Text style={styles.label}>{data.data.label}</Text>
          {warehouse?.id == data.data.id && (
            <Icon
              name="check-circle"
              type="material-icons"
              color="#00FF00"
              size={20}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={organisation.active_organisation.authorised_warehouses || []}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Empty useButton={false} />
        </View>
      )}
    />
    {warehouse?.id  && (
      <FAB
        placement="right"
        onPress={() => navigation.navigate('Home')}
        color={MAINCOLORS.primary}>
        <Icon name="arrow-right" type="feather" color="white" />
      </FAB>
    )}
  </SafeAreaView>
  );
};

export default Warehouse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 15,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
