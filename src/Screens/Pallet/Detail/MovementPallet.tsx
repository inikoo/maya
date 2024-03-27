import React, {useState, useEffect, useRef} from 'react';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {View, StyleSheet} from 'react-native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';

function Movement(props) {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState(null);
  const [value, setValue] = useState(props.value);
  const autocompleteRef = useRef(null);

  // Function to fetch details
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

  // Success callback for detail fetch
  const onSuccess = (res: any) => {
    if (res.data) {
      let newData = res.data.map(set => ({...set, id: set.slug, title: set.code}));
      setOptions(newData);
    }
  };

  const onFailed = (error: any) => {
    console.error('Failed to fetch data:', error);
  };

  const getSuggestions = (value: string) => {
    setSearch(value);
  };

  // Effect hook to fetch details on component mount
  useEffect(() => {
    getData();
  }, [search]);

  // Set initial value
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <View style={styles.container}>
      <AutocompleteDropdown
        ref={autocompleteRef}
        dataSet={options}
        closeOnBlur={true}
        useFilter={true}
        clearOnFocus={true}
        onChangeText={getSuggestions}
        onSelectItem={item => {
            item && props.form.setFieldValue('location',item)
          }}
        textInputProps={{
          placeholder: 'Location',
          autoFocus: false,
        }}
        debounce={500}
        initialValue={props.value} // Set default value here
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Movement;
