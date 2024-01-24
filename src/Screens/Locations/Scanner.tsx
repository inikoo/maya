import React, {useState, useEffect, useRef} from 'react';
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
import {Chip, IconButton} from 'react-native-paper';
import {COLORS} from '~/Constant/Color';
import {useNavigation} from '@react-navigation/native';
import {Request} from '~/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {isNull, defaultTo} from 'lodash';

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
  const autocompleteRef = useRef(null);

  useEffect(() => {
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
      if (res.data.length == 1 ){ 
        if(res.data[0].code === search) {
        setSelectedItem(null);
        handleDelayedFunction({...res.data[0], title: res.data[0].code});
      }}else{
        setDataSelected(null);
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
    setSelectedItem(null);
    handleDelayedFunction(value);
    if (autocompleteRef.current) {
      autocompleteRef.current.focus();
    }
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
    if (autocompleteRef.current) {
      autocompleteRef.current.clear();
      autocompleteRef.current.focus();
    }
  };

  const onFailedGetDetail = res => {
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
                ref={autocompleteRef}
                dataSet={locations}
                closeOnBlur={true}
                useFilter={true}
                clearOnFocus={true}
                textInputProps={{
                  placeholder: 'Start typing est...',
                  autoFocus: true, // Add this line to set autofocus to true
                }}
                debounce={500}
                onSelectItem={onSelected}
                loading={loading}
                onChangeText={getSuggestions}
                suggestionsListTextStyle={{
                  color: '#8f3c96',
                }}
              />

              {!loading ? (
                dataSelected ? (
                  <ScrollView>
                    <Card style={styles.card}>
                      <Card.Content>
                        <View style={styles.cardContent}>
                          <View style={styles.info}>
                            <Text style={styles.name}>{dataSelected.code}</Text>
                            <View style={styles.rowContainer}>
                              <Chip
                                style={{
                                  marginHorizontal: 4,
                                  backgroundColor:
                                    dataSelected.status != 'operational'
                                      ? 'red'
                                      : '#87D068',
                                }}>
                                <Text style={styles.price}>
                                  {dataSelected.status}
                                </Text>
                              </Chip>
                              {dataSelected.is_empty && (
                                <Chip
                                  style={{
                                    marginHorizontal: 4,
                                    backgroundColor: 'purple',
                                  }}>
                                  <Text style={styles.price}>Empty</Text>
                                </Chip>
                              )}
                            </View>

                            <View style={styles.descriptionContainer}>
                              <View style={styles.descriptionRow}>
                                <Text style={styles.descriptionTitle}>
                                  Created At:
                                </Text>
                                <Text style={styles.descriptionText}>
                                  {dayjs(dataSelected.created_at).format(
                                    'DD/MM/YY',
                                  )}
                                </Text>
                              </View>
                              <View style={styles.descriptionRow}>
                                <Text style={styles.descriptionTitle}>
                                  Updated At:
                                </Text>
                                <Text style={styles.descriptionText}>
                                  {dayjs(dataSelected.updated_at).format(
                                    'DD/MM/YY',
                                  )}
                                </Text>
                              </View>
                              <View style={styles.descriptionRow}>
                                <Text style={styles.descriptionTitle}>
                                  Audited At:
                                </Text>
                                <Text style={styles.descriptionText}>
                                  {dataSelected.audited_at &&
                                  !isNull(dataSelected.audited_at)
                                    ? dayjs(dataSelected.audited_at).format(
                                        'DD/MM/YY',
                                      )
                                    : '-'}
                                </Text>
                              </View>
                              <View style={styles.descriptionRow}>
                                <Text style={styles.descriptionTitle}>
                                  Stock Value:
                                </Text>
                                <Text style={styles.descriptionText}>
                                  {dataSelected.stock_value}
                                </Text>
                              </View>
                              <View style={styles.descriptionRow}>
                                <Text style={styles.descriptionTitle}>
                                  Max Volume:
                                </Text>
                                <Text style={styles.descriptionText}>
                                  {defaultTo(dataSelected.max_volume, '-')}
                                </Text>
                              </View>
                              <View style={styles.descriptionRow}>
                                <Text style={styles.descriptionTitle}>
                                  Max Weight:
                                </Text>
                                <Text style={styles.descriptionText}>
                                  {defaultTo(dataSelected.max_weight, '-')}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </Card.Content>
                    </Card>
                  </ScrollView>
                ) : null
              ) : (
                <ActivityIndicator size="large" />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    fontSize: 12,
    color: '#fefefe',
  },
  descriptionContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },

  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8f3c96',
    marginBottom: 5,
  },

  descriptionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cardContent: {
    padding: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Scanner;
