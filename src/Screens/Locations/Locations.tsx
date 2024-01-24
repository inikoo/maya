import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Request} from '~/Utils';
import {COLORS} from '~/Constant/Color';
import {Avatar, Card, Badge} from 'react-native-paper';
import {get, toUpper} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ItemProps {
  name: string;
  number_warehouse_areas: number;
  number_locations: number;
  id: number;
}

const Locations = () => {
  const navigation = useNavigation();
  const [warehouse, setWarehouse] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('@AuthenticationToken:Key');
        if (value) {
          const data = JSON.parse(value);
          setUser(data);
          getData(data);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchData(); // Call the fetchData function immediately
  }, []);

  const getData = data => {
    setLoading(true);
    Request(
      'get',
      'locations-index',
      {},
      {},
      [data.active_organisation, data.active_warehouse.id],
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

  const Item = (data: ItemProps) => {
    return (
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.avatarTitleContainer}>
            <Avatar.Icon
              icon="google-maps"
              style={styles.avatarStyle}
              size={50}
            />
            <View style={styles.cardSubtitleContainer}>
              <Text style={styles.cardTitle}>{data.code}</Text>
              <Text style={styles.cardSubtitle}>
                Warehouse Slug: {toUpper(data.warehouse_slug)}
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

  return !loading ? (
    <View>
      <FlatList
        data={warehouse}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default Locations;

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
