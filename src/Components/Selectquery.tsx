import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, TextInput} from 'react-native';
import {Request} from '~/Utils';
import {Text} from '@rneui/themed';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {Dropdown} from 'react-native-element-dropdown';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faCheck} from 'assets/fa/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {get} from 'lodash';

library.add(faCheck);

type Props = {
  urlKey: String;
  args: Array<Any>;
  params: Object;
  onChange: Function;
  label: String;
  value: any;
  PropsValue: string;
  prefix?: string;
};

let timeoutId: any;
function SelectQuery(props: Props) {
  const [options, setOptions] = useState([]);
  const [lastFetchId, setLastFetchId] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [search, setSearch] = useState('');

  const fetchMoreData = (isLoadMore = false) => {
    console.log('fdsf');
    setLastFetchId(prevFetchId => prevFetchId + 1);
    let pageSend = page;
    if (!isLoadMore) {
      setOptions([]);
      setPage(1);
    } else {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      pageSend = page + 1;
    }
    getOptions(pageSend, isLoadMore);
  };

  const getOptions = (finalPage = 1, isLoadMore = false) => {
    Request(
      'get',
      props.urlKey,
      {},
      {
        ...props.params,
        [props.prefix ? `${props.prefix}_perPage` : 'perPage']: 10,
        [props.prefix ? `${props.prefix}Page` : 'page']: page,
        page,
        ['filter[global]']: search,
      },
      props.args,
      onSuccessGetOptions,
      onFailedGetOptions,
      {fetchId: lastFetchId, isLoadMore, finalPage},
    );
  };

  const onSuccessGetOptions = (
    response: object,
    {fetchId, isLoadMore, finalPage},
  ) => {
    if (fetchId !== lastFetchId) return;
    const nextState = get(response, 'data', []);
    if (!isLoadMore) {
      if (finalPage == response.meta.last_page) setIsListEnd(true);
      setOptions(nextState);
    } else {
      setOptions([...options, ...nextState]);
      setLoadingMore(false);
    }
    if (response.meta.last_page == page) setIsListEnd(true);
  };

  const onFailedGetOptions = error => {
    setIsListEnd(true);
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

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item[props.label]}</Text>
        {item[props.PropsValue] === props.value && (
          <FontAwesomeIcon style={styles.icon} icon={faCheck} size={20} />
        )}
      </View>
    );
  };

  const onSearch = (e: string) => {
    setSearch(e);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fetchMoreData();
    }, 500);
  }, [search]);

  return (
    <View style={styles.searchContainer}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={options}
        search
        renderInputSearch={() => (
          <TextInput
            value={search}
            onChangeText={onSearch}
            style={styles.inputSearchStyle}
            placeholder="Search"
          />
        )}
        maxHeight={300}
        labelField={props.label}
        valueField={props.PropsValue}
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={props.value}
        renderItem={renderItem}
        onChange={item => {
          props.onChange(item);
        }}
        flatListProps={{
          onEndReached: () => (isListEnd ? null : fetchMoreData(true)),
          ListFooterComponent: loadingMore ? <ActivityIndicator /> : null,
        }}
      />
    </View>
  );
}

SelectQuery.defaultProps = {
  args: [],
  Params: {},
  onChange: () => null,
  label: 'code',
  PropsValue: 'id',
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 3,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    margin: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
});

export default SelectQuery;
