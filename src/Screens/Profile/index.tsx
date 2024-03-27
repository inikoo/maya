import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Warehouse from '../../assets/image/warehouse.jpeg';
import { useNavigation } from '@react-navigation/native';
import { RemoveCredential } from '~/Utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import Action from '~/Store/Action';
import { COLORS } from '~/Utils/Colors';

const Profile = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);
  const organisation = useSelector(state => state.organisationReducer);


  const logOut = () => {
    RemoveCredential();
    dispatch(Action.DestroyUserSessionProperties());
  };

  const DATA = [
    {
      id: 1,
      title: 'Organisation',
      onPress: () => navigation.navigate('Organisation'),
    },
    {
      id: 4,
      title: 'Fullfilment',
      onPress: () => navigation.navigate('Fullfilment'),
    },
    {
      id: 2,
      title: 'Detail Profile',
      onPress: () => navigation.navigate('Profile Detail'),
    },
    {
      id: 3,
      title: 'Logout',
      onPress: logOut, // Remove the parentheses here
    },
  ].filter(item => {
    if (Object.keys(organisation).length != 0) return true;
    else if (item.title == 'Fullfilment') return false;
    else return true;
  });

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      onPress={item.onPress}
    />
  );

  const Item = ({ title, onPress }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileContainer}>
          <Image
            source={Warehouse}
            style={styles.profileImage}
          />
          <Text style={styles.profileText}>{user.username}</Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.primary
  },
  itemContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
