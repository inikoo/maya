import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Divider, Card, Icon, Text, Badge } from '@rneui/themed';
import { MAINCOLORS } from '~/Utils/Colors';
import { useSelector } from 'react-redux';
import { Request } from '~/Utils';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { get } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import { useFocusEffect } from '@react-navigation/native';

type Item = {
  label: String;
  key: String;
};

export default function HomeScreen({ navigation }) {
  const warehouse = useSelector(state => state.warehouseReducer);
  const organisation = useSelector(state => state.organisationReducer);
  const user = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [countData, setCountData] = useState([]);
  const [notification, setNotification] = useState([]);

  const Bluprint = [
    {
      id: uuidv4(),
      title: 'Deliveries',
      key: 'Deliveries',
      icon: {
        name: 'truck',
        type: 'font-awesome',
        shadowPos: { top: 0, left: 10 },
      },
    },
    {
      id: uuidv4(),
      title: 'Returns',
      key: 'Returns',
      icon: {
        name: 'trolley',
        type: 'material-icons',
        shadowPos: { top: 0, left: 10 },
      },
    },
    {
      id: uuidv4(),
      title: 'Locations',
      key: 'Locations',
      icon: {
        name: 'location-pin',
        type: 'material-icons',
        shadowPos: { top: 0, left: 15 },
      },
    },
    {
      id: uuidv4(),
      title: 'Pallets',
      key: 'Pallets',
      icon: {
        name: 'pallet',
        type: 'material-icons',
        shadowPos: { top: 0, left: 10 },
      },
    },
    {
      id: uuidv4(),
      title: 'Stored Items',
      key: 'StoredItems',
      icon: {
        name: 'box',
        type: 'entypo',
        shadowPos: { top: 0, left: 24 },
      },
    },
  ];

  const reqCountData = () => {
    if (organisation.active_organisation && warehouse.id) {
      setLoading(true);
      Request(
        'get',
        'warehouse-count-data',
        {},
        {},
        [organisation.active_organisation.id, warehouse.id],
        onSuccessGetCount,
        onFailedGetCount,
      );
    }
  };

  const onSuccessGetCount = (response: Object) => {
    setCountData(response.data.stats);
    setLoading(false);
  };

  const onFailedGetCount = (error: Object) => {
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

  const getNotification = () => {
    if (organisation.active_organisation && warehouse.id) {
      setLoading(true);
      Request(
        'get',
        'notification',
        {},
        { [`notifications_filter[filter]`]: 'unread' },
        [],
        res => setNotification(res.data),
        res => {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: get(
              res,
              ['response', 'data', 'message'],
              'failed to get notification',
            ),
          });
        },
      );
    }
  };

  const onPressMenu = (item: Item) => {
    navigation.navigate(item.key);
  };

  const renderMenu = () => {
    return (
      <View style={styles.menuContainer}>
        {Bluprint.map((item, index) => (
          <TouchableOpacity key={item.id} onPress={() => onPressMenu(item)}>
            <View style={styles.menuItem}>
              <LinearGradient
                colors={[MAINCOLORS.primary, '#ff6f00']}
                style={styles.avatarBackground}>
                <Avatar
                  size={50}
                  icon={{ name: item.icon.name, type: item.icon.type }}
                  containerStyle={styles.avatar}
                  iconStyle={{ fontSize: 30 }}
                />
              </LinearGradient>
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderStat = () => {
    return !loading ? (
      <View style={{ ...styles.menuContainer, justifyContent: 'flex-start', gap: 5 }}>
        {Object.entries(countData).map(([key, item]) => (
          <TouchableOpacity key={key} style={{ width: '48%', padding: 5 }}>
            <Card containerStyle={styles.cardStat}>
              <Text style={styles.labelStat}>{item.label}</Text>
              <View style={styles.itemContainer}>
                <Icon
                  name="tags"
                  type="antdesign"
                  size={15}
                  color={MAINCOLORS.danger}
                />
                <Text style={{ fontSize: 12, color: '#444' }}>
                  Total: {item.count}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    ) : (
      <ActivityIndicator size="large" color={MAINCOLORS.primary}/>
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (!organisation.active_organisation) {
        navigation.navigate('Select Organisation');
      } else if (!organisation.active_organisation?.active_authorised_fulfilments) {
        navigation.navigate('Select fullfilment');
      } else {
        reqCountData();
        getNotification();
      }
    }, [organisation, warehouse]),
  );

  return (
    <Layout>
      <View>
        <Header
          title={`Hello, ${user.username}`}
          useRightIcon={true}
          rightIcon={
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}>
              <View>
                <Icon
                  name="notifications-outline"
                  type="ionicon"
                  style={styles.notification}
                />
                <Badge
                  status="primary"
                  value={notification.length}
                  containerStyle={{ position: 'absolute', top: 0, left: 18 }}
                />
              </View>
            </TouchableOpacity>
          }
        />

        <View style={{ alignItems: 'center' }}>{renderStat()}</View>
        <Divider style={{ marginVertical: 20 }} />
        <View style={{ alignItems: 'center' }}>{renderMenu()}</View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
  },
  notification: {
    width: 35,
    height: 35,
    padding: 5,
    marginRight: 15,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    marginVertical: 10,
  },
  avatarBackground: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  avatar: {
    borderWidth: 0,
  },
  menuText: {
    paddingVertical: 5,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  cardStat: {
    borderRadius: 10,
    paddingTop: 10,
    marginTop: 10,
    marginRight: 0,
    marginLeft: 0,
    backgroundColor: '#FAFAFA',
  },
  labelStat: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '700',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
