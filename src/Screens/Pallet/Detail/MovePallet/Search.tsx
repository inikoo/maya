import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export default function SearchMovement(props) {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState(null);
  const autocompleteRef = useRef(null);

  const getData = data => {
    Request(
      'get',
      'locations-index',
      {},
      {'filter[global]': search},
      [organisation.active_organisation.id, warehouse.id],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = (res: any) => {
    if (res.data) {
      let newData = res.data.map(set => ({...set, title: set.code}));
      setOptions(newData);
    }
  };

  const onFailed = (error: any) => {
    console.error('Failed to fetch data:', error);
  };

  const getSuggestions = (value: string) => {
    setSearch(value);
  };


  useEffect(() => {
    getData();
  }, [search]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
      <View style={styles.inputContainer}>
      <AutocompleteDropdown
        ref={autocompleteRef}
        dataSet={options}
        closeOnBlur={true}
        useFilter={true}
        clearOnFocus={true}
        onChangeText={getSuggestions}
        onSelectItem={item => { props.searchFromServer(item) }}
        textInputProps={{
          placeholder: 'Location',
          autoFocus: false,
        }}
        containerStyle={styles.input}
        debounce={500}
        initialValue={props.value} 
      />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {!props.data && (
          <View style={styles.noResultContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../../assets/image/20944142.jpg')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.tryAgainText}>
              No results found. Try again.
            </Text>
          </View>
        )}
        <View
          style={{
            flex: 1,
            width: '100%',
          }}>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300, // Adjust as needed
    height: 300, // Adjust as needed
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  tryAgainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#E5ECF2',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 10,
  },
});
