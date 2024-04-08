import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SearchBar, BottomSheet} from '@rneui/base';
import Request from '~/Utils/request';
import {Icon, Text, Chip} from '@rneui/themed'; // Import Icon from your icon library
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import Empty from '~/Components/Empty';
import {SpeedDial} from '@rneui/themed';

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

  const requestAPI = () => {
    console.log('ss',sortValue)
    setMoreLoading(true);
    Request(
      'get',
      props.urlKey,
      {},
      {perPage: 10, page: page, ...props.params, ['filter[global]']: search},
      props.args,
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = (results: Object) => {
    console.log(results);
    if (results.data.length != 0 && page != 1) {
      setData(prevData => [...prevData, ...results.data]);
    } else if (results.data.length != 0 && page == 1) {
      setData([...results.data]);
    } else {
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

  const setSortValueItem = (value) => {
    const sort = [...sortValue];
    const key = value.key;
    console.log('ddd',key,sort)
    if (sort.includes(key) || sort.includes(`-${key}`)) {
        const index = sort.indexOf(key);
        if (index !== -1) {
            const index2 = sort.indexOf(`-${key}`);
            sort.splice(index2, 1);
        } else {
            const hyphenatedIndex = sort.indexOf(`-${key}`);
            if (hyphenatedIndex !== -1) {
                sort.splice(hyphenatedIndex, 1); 
            }
        }
    } else {
        const hyphenatedIndex = sort.indexOf(`-${key}`);
        if (hyphenatedIndex !== -1) {
            sort.splice(hyphenatedIndex, 1); // Remove -key if found
        } else {
            sort.push(key); // Add key if not found
        }
    }
    setSortValue(sort)
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
              {props.sort.map((item, index) => (
                <TouchableOpacity key={index} style={styles.ContinerSort} onPress={()=>setSortValueItem(item)}>
                  <Text
                    style={{fontSize: 14, fontWeight: '700', marginLeft: 8}}>
                    {item.title}{' '}
                    <Icon name="caretup" type="antdesign" size={9} />
                  </Text>
                </TouchableOpacity>
              ))}
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

  useEffect(() => {
    requestAPI();
    props.navigation.setOptions({
      headerRight: HeaderRight,
      headerShown: !activeSearch,
    });
  }, [page, activeSearch, search]);

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
          <Text>filter</Text>
          <TouchableOpacity onPress={() => setFilterVisible(false)}>
            <Text>Close</Text>
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
