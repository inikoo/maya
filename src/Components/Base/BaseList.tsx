import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import {Request} from '~/Utils';

const HomeScreen = (props: Object) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);

  const requestAPI = () => {
    Request('get', props.urlKey, {}, {perPage : 10, page : page}, props.args, onSuccess, onFailed);
  };

  const onSuccess = (results: Object) => {
    if (results.data.length > 0) {
      setData((prevData) => [...prevData, ...results.data]);
    } else {
      setIsListEnd(true);
    }
    setLoading(false);
    setMoreLoading(false);
  };
  

  const onFailed = (error: Object) => {
    console.log(error);
    setLoading(false);
    setIsListEnd(true);
    setMoreLoading(false);
  };

  useEffect(() => {
    requestAPI();
  }, [page]);

  const fetchMoreData = () => {
    if (!isListEnd && !moreLoading) {
      setMoreLoading(true);
      setPage(page + 1);
    }
  };

  
  const renderFooter = () => (
    <View style={styles.footerText}>
      {moreLoading && <ActivityIndicator />}
      {isListEnd && <Text>No more data at the moment</Text>}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
      <Button onPress={() => requestAPI()} title="Refresh" />
    </View>
  );

  const renderItem = ({item}: {item: ItemData}) => {
    return <Text>{item.name}</Text>;
  };

  return loading ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    </SafeAreaView>
  ) : (
    <FlatList
      contentContainerStyle={{flexGrow: 1}}
      data={data}
      renderItem={props.renderItem ? props.renderItem : renderItem}
      ListHeaderComponent={props.ListHeaderComponent}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      onEndReachedThreshold={0.2}
      onEndReached={fetchMoreData}
    />
  );
};

export default HomeScreen;

HomeScreen.defaultProps = {
  urlKey: '',
  args: [],
  renderItem: undefined,
  ListHeaderComponent : undefined
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
});
