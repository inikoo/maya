import React, {useEffect, useState, useCallback, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  Text,
  SafeAreaView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import {Icon, Avatar, Card, Divider, BottomSheet } from '@rneui/base';
import {Request} from '~/Utils';
import {isObject, isArray, get} from 'lodash';
import Filter from '~/Components/Filter';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    title: ReactNode;
    urlKey: string; // Use 'string' for standard JavaScript string type
    args: any[]; // Array of any type
    filterSchema: any[]; // Array of any type
    sortSchema : any[];
    prefix : string
    params : Object
  };
  
let timeoutId: any;
export function BaseList(props: Props) {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [TotalData, setTotalData] = useState(0);
  const [sortValue, setSortValue] = useState([]);
  const [filterValue, setFilterValue] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [lastFetchId, setLastFetchId] = useState(0);
  const [search, setSearch] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [listModeBulk, setListModeBulk] = useState(false);
  const [bulkValue, setBulkValue] = useState([]);

  const fetchMoreData = (isLoadMore = false) => {
    setLastFetchId(prevFetchId => prevFetchId + 1);
    let pageSend = page;
    if (!isLoadMore) {
      setData([]);
      setPage(1);
      setLoading(true);
    } else {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      pageSend = page + 1;
    }
    requestAPI(pageSend, isLoadMore);
  };


  const setFilterToServer = () => {
    let filter = {...filterValue}; 
    for (const key in filter) {
      if (isObject(filter[key]) || isArray(filter[key])) {
        filter[key] = filter[key].toString();
      }
   } 
    return filter;
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
   /*      sort: sortValue, */
        ...filter
      },
      props.args,
      onSuccess,
      onFailed,
      {fetchId: lastFetchId, isLoadMore, finalPage},
    );
  };

  const onSuccess = (response: object, {fetchId, isLoadMore, finalPage}) => {
    if (fetchId !== lastFetchId) return;
    const nextState = get(response, 'data', []);
    if (!isLoadMore) {
      if (finalPage == response.meta.last_page) setIsListEnd(true);
      setData(nextState);
    } else {
      setData([...data, ...nextState]);
      setLoadingMore(false);
    }

    if (response.meta.last_page == page) setIsListEnd(true);
    setTotalData(response.meta.total);
    setLoading(false);
    setRefreshing(false);
  };

  const onFailed = (error: Object) => {
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

  const renderItem = ({item}: {item: ItemData}) => {
    return (
      <TouchableOpacity>
        <Card containerStyle={styles.cardStat}>
          <Text style={styles.labelStat}>{item.code}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderList = () => {
    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        /* ListEmptyComponent={renderEmpty} */
        onEndReachedThreshold={0.2}
        onEndReached={() => (isListEnd ? null : fetchMoreData(true))}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  };

  const onSearch = (value : String) => {
    setSearch(value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fetchMoreData();
    }, 500);
  };

  const renderSearch = () => {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Search..." value={search} onChangeText={(e)=>onSearch(e)} />
          <TouchableOpacity style={styles.searchIcon}>
            <Icon name="search" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonScan}>
          <TouchableOpacity style={styles.searchIcon}>
            <Icon name="qr-code-scanner" type="material" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (data.length > 0) {
      return (
        <View v-if="data.length > 0" style={styles.footerContainer}>
          {loadingMore && <ActivityIndicator color={MAINCOLORS.primary} />}
          {isListEnd && <Text>No more data at the moment</Text>}
        </View>
      );
    } else return null;
  };

  const onRefresh = () => {
    setRefreshing(true);
    setIsListEnd(false);
    setSearch(null);
    setSortValue([]);
    fetchMoreData();
  };

  const filterButton = () => {
    return (
        <TouchableOpacity   onPress={() => setFilterVisible(true)}>
             <Icon name='filter' type='feather' color='black' />
        </TouchableOpacity>
       
    )
  }

  const onChangeFilter = (value) => {
    setFilterValue(prev => ({ ...prev, ...value }));
    setFilterVisible(false)
  };

  const renderLoading = () => {
    return (
      <SafeAreaView style={{ flex : 1, justifyContent : 'center', alignItems : 'center'}}>
        <ActivityIndicator size="large" color={MAINCOLORS.primary} />
      </SafeAreaView>
    );
  };


  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <Layout>
      <View>
        <Header title={props.title} rightIcon={filterButton()}/>
        {/* search */}
        {renderSearch()}

        {/* record & sort */}
        <View style={styles.recordsWrapper}>
          <LinearGradient
            colors={[MAINCOLORS.primary, '#ff6f00']} // Customize gradient colors
            style={styles.recordsContainer}>
            <Text style={styles.recordsText}>Records : {TotalData}</Text>
          </LinearGradient>
          <TouchableOpacity style={[styles.avatarBackground ]}>
            <Avatar
              size={30}
              containerStyle={styles.sortInactive}
              icon={{
                name: 'sort-alpha-down',
                type: 'font-awesome-5',
                color : 'black'
              }}
            />
          </TouchableOpacity>
        </View>

        <Divider style={{marginTop : 20, marginBottom : 10}}/>

        {/*  render List */}
        <View style={styles.listWraper}>
            {loading ?  renderLoading() : renderList()}
        </View>

          <Filter 
              bluprint={props.filterSchema} 
              onChangeFilter={onChangeFilter}
              value={filterValue}
              isVisible={filterVisible}
              onClose={()=>setFilterVisible(false)}
            />
      
      </View>
    </Layout>
  );
}

BaseList.defaultProps = {
  title: '',
  urlKey: '',
  args: [],
  filterSchema : [],
  sortSchema : []
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '81%',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  buttonScan: {
    width: '15%',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  cardStat: {
    borderRadius: 10,
    paddingTop: 10,
    marginTop: 10,
    marginRight: 0,
    marginLeft: 0,
    backgroundColor: '#FAFAFA',
  },
  labelStat: {
    fontSize: 14,
    fontWeight: '700',
  },
  listWraper: {
    height: 550,
  },
  footerContainer: {
    marginVertical: 10,
  },
  recordsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recordsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  recordsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  sortInactive: {
    backgroundColor: '#FAFAFA',
    borderColor: '#ACCB98',
  },
  avatarBackground: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 3,
    backgroundColor: '#FAFAFA',
  },
  avatar: {
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default BaseList;
