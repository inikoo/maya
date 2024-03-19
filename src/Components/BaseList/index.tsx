import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import {SearchBar} from '@rneui/base';
import Request from '~/Utils/request';
import {Icon} from '@rneui/themed'; // Import Icon from your icon library
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default function BaseList(props) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [search, setSearch] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);

  const requestAPI = () => {
    Request(
      'get',
      props.urlKey,
      {},
      {perPage: 10, page: page, ...props.params, ['filter[global]'] : search},
      props.args,
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = (results: Object) => {
    if (results.data.length > 0) {
      setData(prevData => [...prevData, ...results.data]);
    } else {
      setIsListEnd(true);
    }
    setLoading(false);
    setMoreLoading(false);
  };

  const onFailed = (error: Object) => {
    console.error(error)
    setLoading(false);
    setIsListEnd(true);
    setMoreLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    })
  };

  const fetchMoreData = () => {
    if (!isListEnd && !moreLoading) {
      setMoreLoading(true);
      setPage(page + 1);
    }
  };

  const renderFooter = () => {
    if(data.length > 0) {
      return (
        <View v-if="data.length > 0" style={styles.footerText}>
        {moreLoading && <ActivityIndicator />}
        {isListEnd && <Text>No more data at the moment</Text>}
      </View>
      )
    } else return
  }

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
      <Button onPress={() => requestAPI()} title="Refresh" />
    </View>
  );

  const renderItem = ({item}: {item: ItemData}) => {
    return <Text>{item.name}</Text>;
  };

  const renderLoading = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  };

  const renderList = () => {
    return (
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
    );
  };

  const renderSearch = () => {
    return (
      <SearchBar
        platform="android"
        onChangeText={newVal => setSearch(newVal)}
        placeholder="Search..."
        round
        showCancel
        showLoading={loading}
        cancelButtonTitle="Cancel"
        onCancel={() => setActiveSearch(false)}
        value={search}
        showCancel={true}
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
              size={20}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="sort" type="MaterialIcons" size={20} />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    requestAPI();
    props.navigation.setOptions({
      headerRight: HeaderRight,
      headerShown: !activeSearch,
    });
  }, [page, activeSearch]);

  return loading ? (
    renderLoading()
  ) : (
    <View>
      {activeSearch && renderSearch()}
      {renderList()}
    </View>
  );
}

BaseList.defaultProps = {
  urlKey: '',
  args: [],
  renderItem: undefined,
  listHeaderComponent: undefined, // Corrected prop name
  params: {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
