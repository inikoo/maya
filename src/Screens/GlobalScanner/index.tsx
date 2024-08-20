import React, {useState, useRef} from 'react';
import Request from '~/Utils/request';
import {useSelector} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Icon, Avatar} from '@rneui/base';
import LinearGradient from 'react-native-linear-gradient';
import {MAINCOLORS, COLORS} from '~/Utils/Colors';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import {useNavigation} from '@react-navigation/native';
import {v4 as uuidv4} from 'uuid';
import Empty from '~/Components/Empty';

export default function GlobalSearch(props) {
  const navigation = useNavigation();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataRes, setdataRes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [prefix, setPrefix] = useState('pal');
  const debounceTimeout = useRef(null);

  const searchFromServer = (data) => {
    setLoading(true);
    Request(
      'get',
      'global-search',
      {},
      {['filter[global]']: data},
      [organisation.active_organisation.id, warehouse.id],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = result => {
    if (search !== '') setdataRes(result.data);
    else setdataRes([]);
    setLoading(false);
  };

  const onFailed = error => {
    setdataRes([]);
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

  const onSearch = value => {
    setSearch(value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      searchFromServer(value);
    }, 500); // 500 milliseconds delay
  };

  const renderResultItem = (item, index) => {
    switch (item.model_type) {
      case 'Location':
        return <LocationCard key={index} record={item.model} />;
      case 'Pallet':
        return <PalletCard key={index} record={item.model} />;
      case 'PalletDelivery':
        return <DeliveryCard key={index} record={item.model} />;
      case 'PalletReturn':
        return <ReturnCard key={index} record={item.model} />;
      case 'StoredItem':
        return <StoredItemCard key={index} record={item.model} />;
      default:
        setdataRes([]);
        return null
    }
  };

  return (
    <Layout>
      <View>
        <Header title="Search & scan" />
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              autoFocus={true}
              placeholder="Search..."
              onChangeText={onSearch}
              value={search}
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Icon name="search" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonScan}>
            <TouchableOpacity
              style={styles.searchIcon}
              onPress={() => navigation.navigate('Scanner Global')}>
              <Icon name="qr-code-scanner" type="material" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{fontSize: 18, fontWeight: '500'}}>Result : </Text>
        <ScrollView style={{height: 530}}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={MAINCOLORS.primary} />
            </View>
          ) : dataRes.length > 0 ? (
            dataRes.map((item, index) => renderResultItem(item, index))
          ) : (
            <Empty />
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}

const LocationCard = ({record}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Location', {location: record})}
      style={styles.cardContainer}>
      <View style={styles.listContainer}>
        <Text style={styles.title}>{record.code}</Text>
        <LinearGradient
          colors={[MAINCOLORS.primary, '#ff6f00']}
          style={styles.avatarBackground}>
          <Avatar
            size={40}
            icon={{name: 'location-pin', type: 'entypo'}}
          />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const PalletCard = ({record}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Pallet', {pallet: record})}
      style={styles.cardContainer}>
      <View style={styles.listContainer}>
        <Text style={styles.title}>{record.reference}</Text>
        <LinearGradient
          colors={[MAINCOLORS.primary, '#ff6f00']}
          style={styles.avatarBackground}>
          <Avatar
            size={40}
            icon={{name: 'pallet', type: 'font-awesome-5'}}
          />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const DeliveryCard = ({record}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Delivery', {delivery: record})}
      style={styles.cardContainer}>
      <View style={styles.listContainer}>
        <Text style={styles.title}>{record.code}</Text>
        <LinearGradient
          colors={[MAINCOLORS.primary, '#ff6f00']}
          style={styles.avatarBackground}>
          <Avatar
            size={40}
            icon={{name: 'truck', type: 'font-awesome'}}
          />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const ReturnCard = ({record}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Return', {return: record})}
      style={styles.cardContainer}>
      <View style={styles.listContainer}>
        <Text style={styles.title}>{record.code}</Text>
        <LinearGradient
          colors={[MAINCOLORS.primary, '#ff6f00']}
          style={styles.avatarBackground}>
          <Avatar
            size={40}
            icon={{name: 'trolley', type: 'material-icons'}}
          />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const StoredItemCard = ({record}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('StoredItem', {storedItem: record})}
      style={styles.cardContainer}>
      <View style={styles.listContainer}>
        <Text style={styles.title}>{record.code}</Text>
        <LinearGradient
          colors={[MAINCOLORS.primary, '#ff6f00']}
          style={styles.avatarBackground}>
          <Avatar
            size={40}
            icon={{name: 'box', type: 'entypo'}}
          />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    margin: 5,
    borderWidth: 1,
    borderColor: COLORS.grey6,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    marginHorizontal: 5,
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
