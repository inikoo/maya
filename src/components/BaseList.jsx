import React, {forwardRef, useEffect, useState, useContext} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Spinner} from '@/src/components/ui/spinner';
import request from '@/src/utils/Request';
import globalStyles from '@/globalStyles';
import {SearchIcon} from '@/src/components/ui/icon';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {Button, ButtonText} from '@/src/components/ui/button';
import {
  Input,
  InputField,
  InputSlot,
  InputIcon,
} from '@/src/components/ui/input';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBarcodeScan} from '@/private/fa/pro-regular-svg-icons';

const BaseList = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch Data
  const getDataFromServer = async (isLoadMore = false, newPage = 1) => {
    if (isLoadMore) setIsLoadingMore(true);
    else setIsFetching(true);
    request({
      urlKey: props.urlKey,
      args: props.args,
      params: {
        ...props.params,
        [props.prefix ? `${props.prefix}_perPage` : 'perPage']: 10,
        [props.prefix ? `${props.prefix}Page` : 'page']: newPage,
        ['filter[global]']: searchQuery,
      },
      onBoth: (success, response) => {
        if (success) {
          if (isLoadMore) {
            setData(prevData => [...prevData, ...response.data]);
          } else {
            setData(response.data);
          }
        } else {
          if (response?.data?.message) {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: 'Error',
              textBody: response.data.message,
            });
          } else {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: 'Error',
              textBody: 'Failed to fetch data',
            });
          }
        }
        setIsFetching(false);
        setIsLoadingMore(false);
      },
    });
  };

  const fetchMoreData = (isLoadMore = false) => {
    if (isLoadMore) {
      setPage(prevPage => prevPage + 1);
    } else {
      setPage(1);
      getDataFromServer(false);
    }
  };

  useEffect(() => {
    getDataFromServer(page > 1, page);
  }, [page]);

  useEffect(() => {
    fetchMoreData(false);
  }, []);

  console.log(props.scannerScreen)
  // Handle Search Query
  useEffect(() => {
    fetchMoreData(false);
  }, [searchQuery]);

  return (
    <View style={{flex: 1}}>
      <View className="py-3 flex-row items-center space-x-2 gap-3">
        <Input variant="outline" size="md" className="flex-1">
          <InputField
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            keyboardType="default"
            autoCapitalize="none"
          />
          <InputSlot className="pr-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
        </Input>
       {/*  {props.scannerScreen && (
            <Button size="md" variant="solid" action="primary" onPress={() => props.navigation.navigate(props.scannerScreen)} activeOpacity={0.7}>
              <FontAwesomeIcon icon={faBarcodeScan} color="#fff" />
            </Button>
        )} */}
      </View>

      {/* List Container */}
      <View style={{flex: 1, marginBottom: 45}}>
        {isFetching ? (
          // Show Loading Indicator on First Fetch
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spinner size="large" />
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.slug + index}
            showsVerticalScrollIndicator={false}
            onEndReached={() => fetchMoreData(true)}
            ListFooterComponent={
              isLoadingMore ? (
                <View style={{paddingVertical: 10}}>
                  <Spinner size="small" />
                </View>
              ) : null
            }
            renderItem={({item}) =>
              props.listItem ? (
                props.listItem({item: item, navigation: props.navigation})
              ) : (
                <GroupItem item={item} navigation={props.navigation} />
              )
            }
          />
        )}
      </View>
    </View>
  );
});

const GroupItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={globalStyles.list.card}
      activeOpacity={0.7}
      onPress={() => null}>
      <View style={globalStyles.list.container}>
        <View style={globalStyles.list.textContainer}>
          <Text style={globalStyles.list.title}>{item.reference}</Text>
          <Text style={globalStyles.list.description}>
            {item.slug || 'No description available'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

BaseList.defaultProps = {
  urlKey: '',
  args: [],
  params: {},
};

export default BaseList;
