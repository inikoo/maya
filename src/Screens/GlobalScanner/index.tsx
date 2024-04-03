import React, {useState} from 'react';
import {SpeedDial} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import SearchPage from './Search';
import ScannerPage from './Scanner';
import Request from '~/Utils/request';
import {useSelector} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {ActivityIndicator, View} from 'react-native';

export default function GlobalSearch(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataRes, setdataRes] = useState(null);
  const [Search, setSearch] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const searchFromServer = (data: String) => {
    setLoading(true);
    Request(
      'get',
      'global-search',
      {},
      {},
      [organisation.active_organisation.id, warehouse.id, data],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = result => {
    setdataRes(result.data);
    setSelectedIndex(0);
    setLoading(false);
  };

  const onFailed = (error: object) => {
    setdataRes(null);
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

  const onChangeMode = (index: number) => {
    setOpen(!open);
    setSelectedIndex(index);
  };

  const onSearch = (value: string) => {
    if (value == '') {
      setdataRes(null);
      setSearch(null);
    } else {
      searchFromServer(value);
      setSearch(value);
    }
  };

  return !loading ? (
    <>
      {selectedIndex == 0 ? (
        <SearchPage searchFromServer={onSearch} data={dataRes} value={Search} />
      ) : (
        <ScannerPage searchFromServer={onSearch} data={dataRes} />
      )}
      <SpeedDial
        isOpen={open}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{name: 'search'}}
          title="Search"
          onPress={() => onChangeMode(0)}
        />
        <SpeedDial.Action
          icon={{name: 'qr-code-scanner'}}
          title="Scanner"
          onPress={() => onChangeMode(1)}
        />
      </SpeedDial>
    </>
  ) : (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  subHeader: {
    backgroundColor: '#2089dc',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    marginBottom: 10,
  },
  Button: {
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 40,
    marginRight: 20,
    marginLeft: 20,
  },
});
