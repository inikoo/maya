import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Icon, Avatar} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import LocationCard from './card/LocationCard';
import PalletCard from './card/PalletCard'
import StoredItem  from './card/StoredItem';

export default function GlobalSearch(p) {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();

  const handleSearch = () => {
    p.searchFromServer(inputValue);
  };

  const handleKeyPress = event => {
    if (event.nativeEvent.key === 'Enter') {
      handleSearch();
      Keyboard.dismiss();
    }
  };

  const renderCard = () => {
    if(p.data.model_type == 'Location') return <LocationCard data={p.data} />
    if(p.data.model_type == 'Pallet') return <PalletCard data={p.data} />
    if(p.data.model_type == 'StoredItem') return <StoredItem data={p.data} />
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          onKeyPress={handleKeyPress}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Icon name="search" size={24} />
        </TouchableOpacity>
      </View>
      {!p.data ? (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setInputValue('')}>
          <Icon name="manage-search" size={200} />
        </TouchableOpacity>
      ) : (
        renderCard()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#ffff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 80,
  },
  tryAgainText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
