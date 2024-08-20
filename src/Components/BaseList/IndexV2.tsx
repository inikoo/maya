import React, { useEffect, useState, ReactNode, forwardRef, useImperativeHandle } from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Text,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MAINCOLORS } from '~/Utils/Colors';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import { Icon, Avatar, Card, Divider } from '@rneui/base';
import { Request } from '~/Utils';
import { isObject, isArray, get } from 'lodash';
import Empty from '~/Components/Empty';
import Filter from '~/Components/Filter';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

type Props = {
  title: ReactNode;
  urlKey: string;
  args: any[];
  filterSchema: any[];
  sortSchema: string;
  prefix: string;
  params: Object;
  itemKey: string;
  leftOpenValue: Number;
  rightOpenValue: Number;
  enableSwipe: boolean;
  itemList: ReactNode | Function;
  useScan: Boolean;
  screenNavigation: String;
};

let timeoutId: any;
const BaseList = forwardRef((props: Props, ref) => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [TotalData, setTotalData] = useState(0);
  const [sortValue, setSortValue] = useState(props.sortSchema ? `-${props.sortSchema}` : null);
  const [filterValue, setFilterValue] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [lastFetchId, setLastFetchId] = useState(0);
  const [search, setSearch] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [listModeBulk, setListModeBulk] = useState(false);
  const [bulkValue, setBulkValue] = useState([]);

  useImperativeHandle(ref, () => ({
    refreshList: () => {
      onRefresh();
    },
  }));

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
    let filter = { ...filterValue };
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
        ...(sortValue ? { sort: sortValue } : {}),
        ...filter,
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

  const renderItem = ({ item }: { item: ItemData }) => {
    if (!props.itemList) {
      return (
        <View style={{ backgroundColor: '#ffffff' }}>
          <TouchableOpacity>
            <Card containerStyle={styles.cardStat}>
              <Text style={styles.labelStat}>{item[props.itemKey]}</Text>
            </Card>
          </TouchableOpacity>
        </View>
      );
    } else {
      return props.itemList(item);
    }
  };

  const renderHiddenItem = ({ item }: { item: ItemData }) => {
    return (
      <View style={styles.hiddenItemContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name='trash' type='font-awesome-5' color='#ffffff' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item.id)}
        >
          <Icon name='edit' type='font-awesome-5' color='#ffffff' />
        </TouchableOpacity>
      </View>
    );
  };

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log(`Edit item with id: ${id}`);
  };

  const renderEmpty = () => (
    <Empty buttonOnPress={() => fetchMoreData()} />
  );

  const renderList = () => {
    if (props.enableSwipe) {
      return (
        <SwipeListView
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={props.leftOpenValue}
          rightOpenValue={props.rightOpenValue}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0.2}
          onEndReached={() => (isListEnd ? null : fetchMoreData(true))}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      );
    } else {
      return (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0.2}
          onEndReached={() => (isListEnd ? null : fetchMoreData(true))}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      );
    }
  };

  const onSearch = (value: string) => {
    setSearch(value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fetchMoreData();
    }, 500);
  };

  const renderSearch = () => {
    return (
      <View style={styles.searchContainer}>
        <View style={{ ...styles.inputContainer, width: !props.useScan ? '100%' : '81%' }}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={search}
            onChangeText={e => onSearch(e)}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Icon name="search" size={24} />
          </TouchableOpacity>
        </View>
        {props.useScan && (
          <View style={styles.buttonScan}>
            <TouchableOpacity style={styles.searchIcon} onPress={scanPress}>
              <Icon name="qr-code-scanner" type="material" size={24} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderFooter = () => {
    if (data.length > 0) {
      return (
        <View style={styles.footerContainer}>
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
    setSortValue(`-${props.sortSchema}`);
    fetchMoreData();
  };

  const filterButton = () => {
    if (props.filterSchema.length > 0) {
      return (
        <TouchableOpacity onPress={() => setFilterVisible(true)}>
          <Icon name='filter' type='feather' color='black' />
        </TouchableOpacity>
      );
    }
  };

  const onChangeFilter = (value) => {
    if (value) {
      setFilterValue(prev => ({ ...prev, ...value }));
    } else setFilterValue(prev => ({}));

    setFilterVisible(false);
  };

  const renderLoading = () => {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={MAINCOLORS.primary} />
      </SafeAreaView>
    );
  };

  const onSort = () => {
    if (sortValue.includes('-')) setSortValue(props.sortSchema);
    else setSortValue(`-${props.sortSchema}`);
  };

  const scanPress = () => {
    if (props.screenNavigation) navigation.navigate(props.screenNavigation);
  };

  useEffect(() => {
    fetchMoreData();
  }, [sortValue, filterValue]);

  return (
    <Layout>
      <View>
        <Header title={props.title} rightIcon={filterButton()} />
        {renderSearch()}
        <View style={styles.recordsWrapper}>
          <LinearGradient
            colors={[MAINCOLORS.primary, '#ff6f00']}
            style={styles.recordsContainer}>
            <Text style={styles.recordsText}>Records : {TotalData}</Text>
          </LinearGradient>
          {props.sortSchema && (
            <TouchableOpacity onPress={onSort} style={styles.avatarBackground}>
              <Avatar
                size={30}
                containerStyle={styles.sortInactive}
                icon={{
                  name: !sortValue.includes('-') ? 'sort-alpha-down' : 'sort-alpha-up-alt',
                  type: 'font-awesome-5',
                  color: 'black'
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <Divider style={styles.divider} />
        <View style={styles.listWraper}>
          {loading ? renderLoading() : renderList()}
        </View>
        <Filter
          bluprint={props.filterSchema}
          onChangeFilter={onChangeFilter}
          value={filterValue}
          isVisible={filterVisible}
          onClose={() => setFilterVisible(false)}
        />
      </View>
    </Layout>
  );
});

BaseList.defaultProps = {
  title: '',
  urlKey: '',
  args: [],
  filterSchema: [],
  enableSwipe: false,
  leftOpenValue: 50,
  rightOpenValue: -60,
  useScan: true
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
  listWraper: {
    height: 550,
  },
  footerContainer: {
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'center'
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hiddenItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    paddingTop: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  hiddenItemText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  divider: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default BaseList;
