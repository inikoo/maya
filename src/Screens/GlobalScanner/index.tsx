import React, {useState} from 'react';
import {SpeedDial} from '@rneui/themed';
import SearchPage from './Search';
import ScannerPage from './Scanner';
import Request from '~/Utils/request';
import {useSelector} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {
  TextInput,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon, Avatar} from '@rneui/base';
import LinearGradient from 'react-native-linear-gradient';
import {MAINCOLORS} from '~/Utils/Colors';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';

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

  return (
    <Layout>
      <View>
        <Header title='Search & scan' />
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              autoFocus={true}
              placeholder="Search..."
            />
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

        <View>
          <Text style={{...styles.title, fontSize: 18}}>Last Search</Text>
          <View style={styles.cardContainer}>
            <View style={styles.listContainer}>
              <Text style={{...styles.title, fontSize: 16}}>Pal-1990</Text>
              <LinearGradient
                colors={[MAINCOLORS.primary, '#ff6f00']} // Customize gradient colors
                style={styles.avatarBackground}>
                <Avatar
                  size={40}
                  icon={{name: 'pallet', type: 'font-awesome-5'}}
                />
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '81%',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  buttonScan: {
    width: '15%',
    marginTop: 20,
    marginBottom: 20,
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
  cardContainer: {
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    width: '100%',
    height: 60,
  },
  avatarBackground: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
