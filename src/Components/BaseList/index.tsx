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
import { isObject, isArray, get } from "lodash"


let timeoutId: any;
export default function BaseList(props) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const navigation = useNavigation();
  const [openDial, setOpenDial] = useState(false);
  const [TotalData, setTotalData] = useState(0);
  const [sortValue, setSortValue] = useState([]);
  const [filterValue, setFilterValue] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [lastFetchId, setLastFetchId] = useState(0);
  const [search, setSearch] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false)
  const [isListEnd, setIsListEnd] = useState(false);
  const [listModeBulk, setListModeBulk] = useState(false);
  const [bulkValue, setBulkValue] = useState([]);

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



  const setFilterToServer = () => {
    let filter = {...filterValue}; 
    for (const key in filter) {
      if (isObject(filter[key]) || isArray(filter[key])) {
        filter[key] = filter[key].toString();
      }
   } 
    return filter;
  };

  const fetchMoreData = (isLoadMore = false) => {
    setLastFetchId((prevFetchId) => prevFetchId + 1);
    let pageSend = page
    if (!isLoadMore) {
      setData([]);
      setPage(1);
      setLoading(true);
    } else {
      setLoadingMore(true)
      setPage((prevPage) => prevPage + 1)
      pageSend = page + 1
    }
    requestAPI(pageSend,isLoadMore)
  };
  

  const requestAPI = (finalPage = 1, isLoadMore = false) => {
    const filter = setFilterToServer();
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
      onFailed,
      { fetchId: lastFetchId, isLoadMore, finalPage },
    );
  };
  

  const onSuccess = (response: object, { fetchId, isLoadMore, finalPage }) => {
    if (fetchId !== lastFetchId) return;
    const nextState = get(response, 'data', []);
    if (!isLoadMore) {
      if(finalPage == response.meta.last_page) setIsListEnd(true)
      setData(nextState);
    } else {
      setData([...data, ...nextState]);
      setLoadingMore(false)
    }

    if(response.meta.last_page == page) setIsListEnd(true)
    setTotalData(response.meta.total);
    setLoading(false);
    setRefreshing(false);
  };



  const onFailed = (error: Object) => {
    console.log(error);
    setIsListEnd(true);
    setLoading(false);
    setRefreshing(false);
    setLoadingMore(false);
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
        textBody: error.message,
      });
    }
  };


  const renderFooter = () => {
    if (data.length > 0) {
      return (
        <View v-if="data.length > 0" style={styles.footerText}>
          {loadingMore && <ActivityIndicator />}
          {isListEnd && <Text>No more data at the moment</Text>}
        </View>
      );
    } else return;
  };

  const renderEmpty = () => <Empty buttonOnPress={() => fetchMoreData()} />;
 
  const onLongPress = (item) => {
    let updatedValue = [...bulkValue];
    
    if (updatedValue.includes(item[props.key])) {
        updatedValue = updatedValue.filter(key => key !== item[props.key]);
    } else {
        updatedValue.push(item[props.key]);
    }
    
    setBulkValue(updatedValue);

    if (updatedValue.length === 0) {
        setListModeBulk(prev => false);
    } else {
        setListModeBulk(prev => true);
    }
};



  const renderItem = ({item}: {item: ItemData}) => {
    if(props.renderItem) return props.renderItem(item, { onLongPress, listModeBulk, bulkValue })
    return <Text key={item.key}>{item.name}</Text>;
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
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()} // Key extractor function
          renderItem={renderItem}
          ListHeaderComponent={props.listHeaderComponent} // Corrected prop name
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0.2}
          onEndReached={()=> isListEnd ? null : fetchMoreData(true)}
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
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
          {props.filter.length > 0 && (
            <TouchableOpacity>
              <Icon
                name="sort"
                type="MaterialIcons"
                size={25}
                color={COLORS.grey8}
                onPress={() => setFilterVisible(true)}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return null;
  };

  const onSearch = value => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setSearch(value);
    }, 3000); 
  }

  const goScanner = () => {
    navigation.navigate(`${props.title} Scanner`);
    setOpenDial(false);
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
    setIsListEnd(false)
    setSearch(null)
    setSortValue([])
    setFilterValue(null)
    fetchMoreData();
  };

  const renderFilter = () => {
    return props.showRecords ? (
      <View
      /*   horizontal={true} */
  /*       contentContainerStyle={{
          minWidth: '100%',
          height : 50,
          backgroundColor: COLORS.grey7,
        }} */
        >
        {listModeBulk ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center', // Align items horizontally
              padding: 10,
              backgroundColor: COLORS.grey7,
            }}>
            <View style={styles.ContinerSort}>
              <Text style={{fontSize: 14, fontWeight: '700', marginLeft: 8}}>
                Choosen: {bulkValue.length}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                ...styles.ContinerSort,
                backgroundColor: MAINCOLORS.danger,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  marginLeft: 8,
                  color: 'white',
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: COLORS.grey7,
            }}>
            <View style={styles.ContinerSort}>
              <Text style={{fontSize: 14, fontWeight: '700', marginLeft: 8}}>
                Records: {TotalData}
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
        )}
      </View>
    ) : null;
  };
  

  useEffect(() => { 
    fetchMoreData();
    props.navigation.setOptions({
      headerRight: HeaderRight,
      headerShown: !activeSearch,
    });
  }, [activeSearch, search,sortValue, filterValue]);

  return loading ? (
    renderLoading()
  ) : (
    <View style={styles.containerList}>
      {activeSearch && renderSearch()}
      {data.length > 0 && renderFilter()}
      {renderList()}
      {props.settingButton && (
        <SpeedDial
          isOpen={openDial}
          onOpen={() => setOpenDial(!openDial)}
          onClose={() => setOpenDial(!openDial)}>
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
  key: 'id',
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
