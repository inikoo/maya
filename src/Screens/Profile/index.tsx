import React from 'react';
import {
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Warehouse from '../../assets/image/warehouse.jpeg';
import {useNavigation} from '@react-navigation/native';
import {RemoveCredential} from '~/Utils/auth';
import {useDispatch, useSelector} from 'react-redux';
import Action from '~/Store/Action';
import {COLORS} from '~/Utils/Colors';
import {v4 as uuidv4} from 'uuid';
import {Icon} from '@rneui/themed';

const Profile = props => {
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
      id: uuidv4(),
      title: 'Organisation',
      onPress: () => navigation.navigate('Organisation'),
    },
    {
      id: uuidv4(),
      title: 'Fullfilment',
      onPress: () => navigation.navigate('Fullfilment'),
    },
    {
      id: uuidv4(),
      title: 'Detail Profile',
      onPress: () => navigation.navigate('Profile Detail'),
    },
    {
      id: uuidv4(),
      title: 'Logout',
      onPress: logOut, // Remove the parentheses here
    },
  ].filter(item => {
    if (Object.keys(organisation).length != 0) return true;
    else if (item.title == 'Fullfilment') return false;
    else return true;
  });

  const renderItem = ({item}) => (
    <Item title={item.title} onPress={item.onPress} />
  );

  const Item = ({title, onPress}) => (
    <TouchableHighlight
      underlayColor={COLORS.primary}
      style={styles.itemContainer}
      onPress={onPress}>
      <View style={styles.itemContent}>
        <Text style={title != 'Logout' ? styles.title : styles.logoutTitle}>
          {title}
        </Text>
        <Icon
          name="keyboard-arrow-right"
          type="material-icons"
          size={18}
          color="#000"
        />
      </View>
    </TouchableHighlight>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileContainer}>
          <Image source={Warehouse} style={styles.profileImage} />
          <Text style={styles.profileText}>{user.username}</Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderColor: COLORS.black,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.black,
    textShadowColor: COLORS.primary, 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 4,
  },
  itemContainer: {
    backgroundColor: COLORS.darkGrey,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    borderWidth:1,
    borderColor:COLORS.dark
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  logoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});

export default Profile;
