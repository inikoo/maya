import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import {Icon} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import LocationCard from './card/LocationCard';
import PalletCard from './card/PalletCard';
import StoredItem from './card/StoredItem';

export default function GlobalSearch(p) {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();

  const handleSearch = () => {
    p.searchFromServer(inputValue);
  };


  const renderCard = () => {
    if (p.data?.model_type === 'Location') return <LocationCard data={p.data} />;
    if (p.data?.model_type === 'Pallet') return <PalletCard data={p.data} />;
    if (p.data?.model_type === 'StoredItem') return <StoredItem data={p.data} />;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          placeholder="Search..."
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Icon name="search" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {!p.data && (
          <View style={styles.noResultContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/image/20944142.jpg')}
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
          {renderCard()}
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
});
