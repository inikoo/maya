import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {COLORS} from '~/Constant/Color';
import {useNavigation} from '@react-navigation/native';
import {Request} from '~/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AutocompleteDropdownContextProvider,
  AutocompleteDropdown,
} from 'react-native-autocomplete-dropdown';

function Scanner(p) {
  const navigation = useNavigation();
  const dayjs = require('dayjs');
  const [locations, setlocations] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState<any>('');
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [dataSelected, setDataSelected] = useState<object | null>();

  useEffect(() => {
    console.log('asdfflkl');
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(
          '@AuthenticationToken:Key',
        );
        if (storedToken) {
          const userData = JSON.parse(storedToken);
          setUser(userData);
          getData(userData);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchData();
  }, [search]);

  const getData = data => {
    Request(
      'get',
      'locations-index',
      {},
      {'filter[global]': search},
      [data.active_organisation, data.active_warehouse.id],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = (res: any) => {
    if (res.data) {
      let newData = res.data.map(set => ({...set, title: set.code}));

      if (res.data.length === 1 && res.data[0].code === search) {
        setSelectedItem({...res.data[0], title: res.data[0].code});
        handleDelayedFunction({...res.data[0], title: res.data[0].code});
      }

      setlocations(newData);
    }
  };

  const onFailed = (error: any) => {
    console.error('Failed to fetch data:', error);
  };

  const getSuggestions = (value: string) => {
    setSearch(value);
  };


  const onSelected = value => {
    setSelectedItem(value);
    handleDelayedFunction(value);
  };

  const handleDelayedFunction = value => {
    if (user && value) {
      setLoading(true);
      Request(
        'get',
        'locations-show',
        {},
        {},
        [user.active_organisation, value.slug],
        onSuccessGetDetail,
        onFailedGetDetail,
      );
    }
  };

  const onSuccessGetDetail = res => {
    setDataSelected(res);
    setLoading(false);
  };

  const onFailedGetDetail = res => {
    console.log(res);
    setLoading(false);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <StatusBar translucent={false} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <ScrollView
          nestedScrollEnabled
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.section}>
              <AutocompleteDropdown
                dataSet={locations}
                closeOnBlur={true}
                useFilter={true}
                clearOnFocus={true}
                textInputProps={{
                  placeholder: 'Start typing est...',
                }}
                debounce={1000}
                onSelectItem={onSelected}
                loading={loading}
                onChangeText={getSuggestions}
                suggestionsListTextStyle={{
                  color: '#8f3c96',
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {!loading ? (
        dataSelected ? (
          <ScrollView>
            <View>
              <View style={styles.container}>
                <View style={styles.info}>
                  <Text style={styles.name}>{dataSelected.code}</Text>
                  <Text style={styles.price}>{dataSelected.status}</Text>
                  <View style={styles.descriptionContainer}>
                    <View style={styles.descriptionRow}>
                      <Text style={styles.descriptionTitle}>Created At:</Text>
                      <Text style={styles.descriptionText}>
                        {dayjs(dataSelected.created_at).format('DD MM YYYY')}
                      </Text>
                    </View>
                    <View style={styles.descriptionRow}>
                      <Text style={styles.descriptionTitle}>Stock Value:</Text>
                      <Text style={styles.descriptionText}>
                        {dataSelected.stock_value}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : null
      ) : (
        <ActivityIndicator size="large" />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 50,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#999',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginTop: 3,
    borderTopWidth: 1, // Add top border to the first row
    borderColor: '#ccc', // Border color
  },

  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1, // Add bottom border to each row
    borderColor: '#ccc', // Border color
  },

  // Adjusted the fontSize, color, and added margin
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8f3c96',
    marginBottom: 5,
  },

  // Adjusted the fontSize, color, and added margin
  descriptionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

export default Scanner;
