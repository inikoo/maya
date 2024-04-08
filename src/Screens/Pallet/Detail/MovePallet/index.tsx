import React, {useState} from 'react';
import {SpeedDial} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import SearchPage from './Search';
import ScannerPage from './Scanner';
import Request from '~/Utils/request';
import {useSelector} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {ActivityIndicator, View} from 'react-native';
import { get, isNull } from 'lodash'
import { useNavigation } from '@react-navigation/native';

export default function MovePallet(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataRes, setdataRes] = useState(null);
  const [Search, setSearch] = useState(isNull(get(props,['route','params','pallet','location']) ? { id : 0, title : null } : get(props,['route','params','pallet','location'],{ id : 0, title : null })))
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const pallet = props.route.params.pallet
  const navigation = useNavigation()


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
    MoveToNewLocation(value)
  };

  const MoveToNewLocation = async (data: object) => {
    await Request(
      'patch',
      'pallet-location',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        data.id,
        pallet.id,
      ],
      onMoveSuccess,
      onMoveFailed,
    );
  };

  const onMoveSuccess = response => {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet already move to new Location',
    });
    navigation.navigate('Pallet',{pallet : pallet})
  };

  const onMoveFailed = response => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Success',
      textBody: response.response.data.message,
    });
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
        onClose={() => setOpen(!open)}
      >
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

const styles = StyleSheet.create({});