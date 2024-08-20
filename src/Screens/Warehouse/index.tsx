import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Text, FAB} from '@rneui/themed';
import Action from '~/Store/Action';
import Empty from '~/Components/Empty';
import {MAINCOLORS} from '~/Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import Header from '~/Components/Header';

const Warehouse = (porps: Object) => {
  const dispatch = useDispatch();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const navigation = useNavigation();

  const setSelectedWarehouse = data => {
    dispatch(Action.CreateWarehouseProperties(data));
  };

  const renderItem = ({item}) => <Item data={item} />;

  const Item = (data: Object) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setSelectedWarehouse(data.data)}>
        <View style={styles.itemContent}>
          <Text
            style={{
              ...styles.label,
              fontWeight: warehouse?.id == data.data.id ? '700' : '500',
            }}>
            {data.data.label}
          </Text>
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
      <View style={styles.scrollViewContent}>
        <Header title="Warehouse" />
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
        {warehouse?.id && (
          <FAB
            placement="right"
            onPress={() => navigation.navigate('Main')}
            color={MAINCOLORS.primary}>
            <Icon name="arrow-right" type="feather" color="white" />
          </FAB>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Warehouse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  itemContainer: {
    marginVertical: 8,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});
