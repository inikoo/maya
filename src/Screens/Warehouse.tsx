import React, {useState, useEffect} from 'react';
import {ScrollView, View, FlatList, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Request} from '~/Utils';
import {COLORS} from '~/Constant/Color';
import {Avatar, Card, Badge} from 'react-native-paper';
import {get} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {Action} from '~/Store';

interface ItemProps {
  name: string;
  number_warehouse_areas: number;
  number_locations: number;
  id: number;
}

const Warehouse = () => {
  const navigation = useNavigation();
  const [warehouse, setWarehouse] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('@AuthenticationToken:Key');
        if (value) {
          const data = JSON.parse(value);
          setUser(data);
          getData(data); // Move the API call here after setting the user state
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function immediately
  }, []);

  const getData = data => {
    setLoading(true);
    Request(
      'get',
      'warehouse-index',
      {},
      {},
      [data.active_organisation],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = (res: any) => {
    if (res.data) {
      setWarehouse(res.data);
    }
    setLoading(false);
  };

  const onFailed = (error: any) => {
    setLoading(false);
  };

  const setSelectedWarehouse = async data => {
    const updatedUserData = {
      ...user,
      active_warehouse: data,
    };

    dispatch(Action.CreateUserSessionProperties(updatedUserData));

    setUser(updatedUserData);

    getData(updatedUserData);
  };

  const Item = (data: ItemProps) => {
    return (
      <Card style={styles.card} onPress={() => setSelectedWarehouse(data)}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.avatarTitleContainer}>
            <Avatar.Icon icon="barn" style={styles.avatarStyle} size={50} />
            <View style={styles.cardSubtitleContainer}>
              <Text style={styles.cardTitle}>{data.name}</Text>
              <Text style={styles.cardSubtitle}>
                Warehouse areas: {data.number_warehouse_areas}
              </Text>
              <Text style={styles.cardSubtitle}>
                Locations: {data.number_locations}
              </Text>
            </View>
          </View>
          {get(user, ['active_warehouse', 'id']) == data.id && (
            <Badge style={styles.badge} size={24}>
              Selected
            </Badge>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <ScrollView>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={warehouse}
          renderItem={({item}) => <Item {...item} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </ScrollView>
  );
};

export default Warehouse;

const styles = StyleSheet.create({
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
  cardTitle: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.black,
    marginHorizontal: 10,
  },
  avatarStyle: {
    backgroundColor: COLORS.primary,
  },
  cardSubtitleContainer: {
    padding: 10,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#87D068', // Change the background color as needed
  },
});
