import React, { useEffect, useState } from 'react';
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

const Organisation = (props: Object) => {
  const organisation = useSelector(state => state.organisationReducer);
  const user = useSelector(state => state.userReducer);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItem = ({item}) => <Item data={item} />;

  const setOrganisation = (data: Object) => {
    dispatch(
      Action.CreateUserOrganisationProperties({
        organisations: organisation.organisations,
        active_organisation: {
          ...organisation.active_organisation,
          active_authorised_fulfilments: data,
        },
      }),
    );
    dispatch(Action.CreateWarehouseProperties(data));
  };

  const Item = (data: Object) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setOrganisation(data.data)}>
        <View style={styles.itemContent}>
          <Text
            style={{
              ...styles.label,
              fontWeight:
                organisation.active_organisation.active_authorised_fulfilments
                  ?.slug == data.data.slug
                  ? '700'
                  : '500',
            }}>
            {data.data.code}
          </Text>
          {organisation.active_organisation.active_authorised_fulfilments?.slug ==
            data.data.slug && (
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

  useEffect(()=>{
    let setDataList = organisation.active_organisation.authorised_fulfilments
    const shop =  organisation.active_organisation.authorised_shops.filter((item)=> item.state == 'open')
    setDataList = [...setDataList,...shop]
    setData(setDataList)
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContent}>
        <Header title='Fullfilments' />
          <FlatList
            data={data || []}
            renderItem={renderItem}
            keyExtractor={item => item.slug}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Empty useButton={false} />
              </View>
            )}
          />
        {organisation.active_organisation.active_authorised_fulfilments?.slug && (
          <FAB
            placement="right"
            onPress={() => navigation.navigate('Warehouse')}
            color={MAINCOLORS.primary}>
            <Icon name="arrow-right" type="feather" color="white" />
          </FAB>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Organisation;

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
