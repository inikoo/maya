import React, {useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {SearchBar, BottomSheet} from '@rneui/base';
import Request from '~/Utils/request';
import {Icon, Text, Chip} from '@rneui/themed'; // Import Icon from your icon library
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import Empty from '~/Components/Empty';
import {SpeedDial} from '@rneui/themed';
import Filter from '~/Components/Filter';
import { isObject, isArray } from "lodash"

export default function BaseList(props) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [TotalData, setTotalData] = useState(0);
  const [sortValue, setSortValue] = useState([]);
  const [filterValue, setFilterValue] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const dialAction = [
    ...props.settingOptions.map(item => ({...item})),
    {
      icon: {name: 'qr-code-scanner'},
      title: 'Scanner',
      key: 'scanner',
      onPress: () => goScanner(),
    },
  ].filter(item => {
    if (!props.scanner && item.key == 'scanner') return false;
    return true;
  });
  let timeoutId: any;


  const setFilterToServer = () => {
    let filter = {...filterValue}; 
    for (const key in filter) {
      if (isObject(filter[key]) || isArray(filter[key])) {
        filter[key] = filter[key].toString();
      }
   } 
    return filter;
  };
  

  const requestAPI = () => {
    const filter = setFilterToServer();
    setMoreLoading(true); 
    Request(
      'get',
      props.urlKey,
      {},
      {
        [props.prefix ? `${props.prefix}_perPage` : 'perPage']: 10,
        [props.prefix ? `${props.prefix}Page` : 'page']: page,
        ...props.params,
        ['filter[global]']: search,
        sort: sortValue,
        ...filter
      },
      props.args,
      onSuccess,
      onFailed
    );
  };
  

  const onSuccess = (results: Object) => {
    console.log(results)
    setRefreshing(false);
    if (results.data.length != 0 && page != 1 && Object.keys(filterValue).length < 0) {
      setData(prevData => [...prevData, ...results.data]);
    } else if (results.data.length != 0 && page == 1) {
      setData([...results.data]);
    } else if (Object.keys(filterValue).length > 0 ) {
      setData([...results.data]);
    }else {
      if (!search) setIsListEnd(true);
    }
    setTotalPage(results.meta.last_page);
    setLoading(false);
    setMoreLoading(false);
    setTotalData(results.meta.total);
    if (page == totalPage) setIsListEnd(true);
  };

  const onFailed = (error: Object) => {
    console.log(error);
    if (page == totalPage) setIsListEnd(true);
    setLoading(false);
    setRefreshing(false);
    setMoreLoading(false);
    if (error?.response?.data?.message) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error.response.data.message,
      });
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'failed from server',
      });
    }
  };

  const fetchMoreData = () => {
    if (!isListEnd && !moreLoading) {
      setMoreLoading(true);
      setPage(page + 1);
    }
  };

  const renderFooter = () => {
    if (data.length > 0) {
      return (
        <View v-if="data.length > 0" style={styles.footerText}>
          {moreLoading && <ActivityIndicator />}
          {isListEnd && <Text>No more data at the moment</Text>}
        </View>
      );
    } else return;
  };

  const renderEmpty = () => <Empty buttonOnPress={() => requestAPI()} />;

  const renderItem = ({item}: {item: ItemData}) => {
    return <Text>{item.name}</Text>;
  };

  const renderLoading = () => {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  };

  const setSortValueItem = value => {
    const sort = [...sortValue];
    const key = value.key;
    const hyphenatedKey = `-${key}`;

    // Check if the key or its hyphenated version is already in the sort array
    const includesKey = sort.includes(key);
    const includesHyphenatedKey = sort.includes(hyphenatedKey);

    if (includesKey || includesHyphenatedKey) {
      // If key or hyphenated key is found, remove it
      const index = includesKey
        ? sort.indexOf(key)
        : sort.indexOf(hyphenatedKey);
      if (includesKey) sort.splice(index, 1, `-${key}`);
      else sort.splice(index, 1);
    } else {
      sort.push(key);
    }

    setSortValue(sort);
  };

  const renderIconSort = item => {
    if (sortValue.includes(item.key) && sortValue.length > 0)
      return <Icon name="caretup" type="antdesign" size={9} />;
    else if (sortValue.includes(`-${item.key}`) && sortValue.length > 0)
      return <Icon name="caretdown" type="antdesign" size={9} />;
    return;
  };

  const renderList = () => {
    return (
      <View>
        {props.showRecords && (
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              minWidth: '100%',
              backgroundColor: COLORS.grey7,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center', // Align items horizontally
                padding: 10,
                backgroundColor: COLORS.grey7,
              }}>
              <View style={styles.ContinerSort}>
                <Text style={{fontSize: 14, fontWeight: '700', marginLeft: 8}}>
                  Records : {TotalData}
                </Text>
              </View>
              {props.sort.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.ContinerSort}
                    onPress={() => setSortValueItem(item)}>
                    <Text
                      style={{fontSize: 14, fontWeight: '700', marginLeft: 8}}>
                      {item.title} {renderIconSort(item)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()} // Key extractor function
          renderItem={props.renderItem ? props.renderItem : renderItem}
          ListHeaderComponent={props.listHeaderComponent} // Corrected prop name
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    );
  };

  const renderSearch = () => {
    return (
      <SearchBar
        platform="android"
        onChangeText={onSearch}
        placeholder="Search..."
        round
        showCancel
        showLoading={loading}
        cancelButtonTitle="Cancel"
        onCancel={() => {
          setActiveSearch(false), setSearch(null);
        }}
        value={search}
        showCancel={true}
        showLoading={loading}
        autoFocus={true}
        lightTheme={true}
      />
    );
  };

  const HeaderRight = () => {
    if (!activeSearch) {
      return (
        <View style={{flexDirection: 'row', marginRight: 10}}>
          <TouchableOpacity onPress={() => setActiveSearch(true)}>
            <Icon
              name="search"
              type="FontAwesome5"
              size={25}
              color={COLORS.grey8}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="sort"
              type="MaterialIcons"
              size={25}
              color={COLORS.grey8}
              onPress={() => setFilterVisible(true)}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const onSearch = value => {
    setSearch(value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // Clear current data and reset page number
      setData([]);
      setPage(1);
      requestAPI();
    }, 500);
  };

  const goScanner = () => {
    navigation.navigate(`${props.title} Scanner`);
    setOpen(false);
  };

  const onChangeFilter = (value) => {
    setFilterValue(prev => ({ ...prev, ...value }));
    setFilterVisible(false)
  };
  

  const onResetFilter = () => {
    setFilterValue({})
    setFilterVisible(false)
  };

  const onRefresh = () => {
    setRefreshing(true)
    requestAPI();
  };

  useEffect(() => { 
    requestAPI();
    props.navigation.setOptions({
      headerRight: HeaderRight,
      headerShown: !activeSearch,
    });
  }, [page, activeSearch, search, sortValue, filterValue]);

  return loading ? (
    renderLoading()
  ) : (
    <View style={styles.containerList}>
      {activeSearch && renderSearch()}
      {renderList()}
      {props.settingButton && (
        <SpeedDial
          isOpen={open}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}>
          {dialAction.map((item, index) => (
            <SpeedDial.Action key={index} {...item} />
          ))}
        </SpeedDial>
      )}
      <BottomSheet modalProps={{}} isVisible={filterVisible}>
        <View style={{padding: 20, backgroundColor: '#ffff'}}>
          <Filter 
              bluprint={props.filter} 
              onChangeFilter={onChangeFilter}
              value={filterValue}
              onResetFilter={onResetFilter}
            />
          <TouchableOpacity
            onPress={() => setFilterVisible(false)}
            style={{position: 'absolute', top: 10, right: 10}}>
            <Text style={{color: MAINCOLORS.danger}}>Close</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

BaseList.defaultProps = {
  urlKey: '',
  args: [],
  renderItem: undefined,
  listHeaderComponent: undefined, // Corrected prop name
  params: {},
  scanner: true,
  title: '',
  settingButton: true,
  settingOptions: [],
  showRecords: true,
  sort: [],
  filter: [],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  list: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerList: {
    display: 'flex',
    height: '99%',
  },
  ButtonScan: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: COLORS.grey4,
    right: 20,
    bottom: 30,
    backgroundColor: MAINCOLORS.warning,
    borderRadius: 20,
    padding: 10,
  },
  ContinerSort: {
    flexDirection: 'row',
    alignItems: 'center', // Align items horizontally
    backgroundColor: COLORS.grey5,
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});
