import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const menu = [
  {
    id: 1,
    title: 'Warehouse',
    total: '256',
    screen: 'Warehouse',
    backgroundColor: '#ffdcb2',
    titleColor: '#ff8c00',
  },
  {
    id: 2,
    title: 'Locations',
    total: '200',
    screen: 'locations',
    backgroundColor: '#bfdfdf',
    titleColor: '#008080',
  },
  {
    id: 3,
    title: 'Unlocated Pallete',
    total: '890',
    screen: 'Unlocated Pallet',
    backgroundColor: '#e2caf8',
    titleColor: '#8a2be2',
  },
]

const Home = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const renderAppointmentCard = ({item, index}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.screen)}
      style={[
        styles.card,
        {
          backgroundColor: item.backgroundColor,
          borderTopWidth: 4,
          borderTopColor: item.titleColor,
        },
      ]}>
      <Text style={[styles.cardTitle, {color: item.titleColor}]}>
        {item.title}
      </Text>
      <View style={styles.cardDates}>
        <Text style={styles.cardDate}>Total : {item.total}</Text>
      </View>
    </TouchableOpacity>
  );
           
  const searchFilter = item => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={menu.filter(searchFilter)}
        renderItem={renderAppointmentCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#A9A9A9',
    marginBottom: 10,
    paddingHorizontal: 10,
    marginHorizontal: 14,
  },
  card: {
    flex: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  cardDates: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  cardDate: {
    color: '#888',
  },
  cardContent: {
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  attendeesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  attendeeImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginLeft: -10,
    borderWidth: 0.5,
    marginTop: 3,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginTop: 15,
    backgroundColor: '#DCDCDC',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00008B',
    marginRight: 10,
  },
  buttonText: {
    color: '#00008B',
  },
});

export default Home;
