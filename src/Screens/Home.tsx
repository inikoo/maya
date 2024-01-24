import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {RemoveCredential} from '~/Utils/auth';
import {Avatar, Card, Divider, Chip} from 'react-native-paper';
import {COLORS} from '~/Constant/Color';
import {get} from 'lodash';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import Action from '~/Store/Action';
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [selectedOrganisation, setSelectedOrganisation] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('@AuthenticationToken:Key');
      if (value) {
        const data = JSON.parse(value);
        setUser(data);
        setSelectedOrganisation(data.active_organisation);
      }
      console.log(JSON.parse(value));
    } catch (error) {
      console.error('Error retrieving data:', error);
    } finally {
      setLoading(false);
    }
  };

  const ChangeOrganisation = (value, index) => {
    dispatch(
      Action.CreateUserSessionProperties({
        ...user,
        active_organisation: value,
      }),
    );
    setSelectedOrganisation(value);
  };

  const menu = [
    {id: '1', text: 'Warehouse', icon: 'barn', screen: 'Warehouse'},
 /*    {id: '2', text: 'Warehouse Area', icon: 'google-maps', screen: 'locations'}, */
    {id: '2', text: 'Location', icon: 'google-maps', screen: 'locations'},
    {id: '3', text: 'Product', icon: 'amplifier', screen: 'locations'},
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return !loading ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.avatarTitleContainer}>
              <Avatar.Icon
                icon="office-building-cog-outline"
                style={styles.avatarStyle}
                size={30}
              />
              <Text style={styles.cardTitle}>Group</Text>
            </View>
            <View style={styles.cardSubtitleContainer}>
              <Text style={styles.cardSubtitle}>
                {get(user, ['group', 'label'])}
              </Text>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.avatarTitleContainer}>
              <Avatar.Icon
                icon="office-building"
                style={styles.avatarStyle}
                size={30}
              />
              <Text style={styles.cardTitle}>Organisation</Text>
            </View>

            <Picker
              style={styles.picker}
              selectedValue={selectedOrganisation}
              onValueChange={ChangeOrganisation}>
              {get(user, 'organisations', []).map(item => (
                <Picker.Item
                  key={item.slug}
                  label={item.label}
                  value={item.id} // Use a unique identifier as the value
                />
              ))}
            </Picker>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.container}>
        <Card.Content style={styles.cardContent}>
          <FlatList
            data={menu}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Pressable
                style={styles.menu}
                onPress={() => navigation.navigate(item.screen)}>
                <Avatar.Icon
                  icon={item.icon}
                  style={styles.avatarStyle}
                  size={50}
                />
                <Text style={{fontSize: 10}}>{item.text}</Text>
              </Pressable>
            )}
            numColumns={4}
            contentContainerStyle={styles.menuContainer}
          />
        </Card.Content>
        <Divider style={{margin: 15}} />
        {get(user,"active_warehouse") && (
          <Card>
            <Card.Content>
              <Text style={{marginBottom: 10}}>Selected Warehouse</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Avatar.Icon
                  icon="barn"
                  style={{backgroundColor: '#87D068'}}
                  size={60}
                />
                <View style={{padding: 10}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: COLORS.black,
                    }}>
                    {get(user, ['active_warehouse', 'name'])}
                  </Text>
                  <View>
                    <Chip style={styles.Chip}>
                      <Text style={{fontSize: 12}}>
                        Warehouse Area :{' '}
                        {get(user, [
                          'active_warehouse',
                          'number_warehouse_areas',
                        ])}
                      </Text>
                    </Chip>
                    <Chip style={styles.Chip}>
                      <Text style={{fontSize: 12}}>
                        Locations :{' '}
                        {get(user, ['active_warehouse', 'number_locations'])}
                      </Text>
                    </Chip>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      </View>
    </SafeAreaView>
  ) : (
    <ActivityIndicator size="large" color={COLORS.primary} />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffff',
  },
  cardContent: {
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  avatarTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  cardSubtitle: {
    fontSize: 18,
    color: COLORS.black,
  },
  avatarStyle: {
    backgroundColor: COLORS.primary,
  },
  picker: {
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
    fontSize: 10,
  },
  textContainer: {
    marginLeft: 5,
  },
  cardSubtitleContainer: {
    padding: 10,
  },
  menu: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  Chip: {
    margin: 3,
    backgroundColor: COLORS.white,
  },
});
