import React, {useState} from 'react';
import {ButtonGroup} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import Search from './Search';
import Scanner from './Scanner';
import Request from '~/Utils/request';
import {useSelector} from 'react-redux';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export default function GlobalSearch(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataRes, setdataRes] = useState(null);

  const searchFromServer = data => {
    if (data == '') setdataRes(null);
    else {
      Request(
        'get',
        'global-search',
        {},
        {},
        [organisation.active_organisation.id, warehouse.id, data],
        onSuccess,
        onFailed,
      );
    }
  };

  const onSuccess = result => {
    console.log('ooo',result)
    setdataRes(result.data);
  };

  const onFailed = error => {
    console.error(error);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

  return (
    <>
      <ButtonGroup
        buttons={['Search', 'Scan Qr']}
        selectedIndex={selectedIndex}
        onPress={value => setSelectedIndex(value)}
        containerStyle={styles.Button}
        selectedButtonStyle={{backgroundColor: MAINCOLORS.primary}}
      />
      {selectedIndex == 0 ? (
        <Search searchFromServer={searchFromServer} data={dataRes} />
      ) : (
        <Scanner searchFromServer={searchFromServer} data={dataRes} />
      )}
    </>
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
  Button : {
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 40,
    marginRight: 20,
    marginLeft: 20,
  }
});
