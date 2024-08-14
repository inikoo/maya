import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Card, Icon, Text, Badge} from '@rneui/themed';
import {useSelector} from 'react-redux';
import {Request} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {get} from 'lodash';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import {useFocusEffect} from '@react-navigation/native';
import {MAINCOLORS} from '~/Utils/Colors';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faInventory,
  faTruckCouch,
  faPallet,
  faSignOut,
  faBox,
} from '../../../assets/fa/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

library.add(faInventory, faTruckCouch, faPallet, faSignOut, faBox);

export default function HomeScreen({navigation}) {
  const warehouse = useSelector(state => state.warehouseReducer);
  const organisation = useSelector(state => state.organisationReducer);
  const [loading, setLoading] = useState(false);
  const [countData, setCountData] = useState([]);
  const [notification, setNotification] = useState([]);

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

  const getNotification = () => {
    if (organisation.active_organisation && warehouse.id) {
      setLoading(true);
      Request(
        'get',
        'notification',
        {},
        {[`notifications_filter[filter]`]: 'unread'},
        [],
        res => setNotification(res.data),
        res => {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: get(
              res,
              ['response', 'data', 'message'],
              'Failed to get notifications',
            ),
          });
        },
      );
    }
  };

  const onSuccessGetCount = response => {
    setCountData(response.data.stats);
    setLoading(false);
  };

  const onFailedGetCount = error => {
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

  const FindIcon = key => {
    switch (key) {
      case 'deliveries':
        return faTruckCouch;
      case 'locations':
        return faInventory;
      case 'pallets':
        return faPallet;
      case 'returns':
        return faSignOut;
      case 'stored_items':
        return faBox;
      default:
        return null;
    }
  };


  const passScreen = (key : String) => {
    switch (key) {
      case 'deliveries':
        return navigation.navigate('Deliveries')
      case 'locations':
        return navigation.navigate('Locations');
      case 'pallets':
        return navigation.navigate('Pallets');
      case 'returns':
        return navigation.navigate('Returns');
      case 'stored_items':
        return navigation.navigate('Stored Items');
      default:
        return null;
    }
  }

  const renderStat = () => {
    return !loading ? (
      <View style={styles.menuContainer}>
        {Object.entries(countData).map(([key, item]) => (
          <TouchableOpacity key={key} style={styles.menuItemWrapper} onPress={()=>passScreen(key)}>
            <Card containerStyle={styles.cardStat}>
              <View style={styles.statContainer}>
                <View style={styles.avatarBackground}>
                  <View style={styles.avatar}>
                    <FontAwesomeIcon
                      icon={FindIcon(key)}
                      style={{color: 'white'}}
                    />
                  </View>
                </View>
                <View style={styles.statDetails}>
                  <Text style={styles.labelStat}>{item.label}</Text>
                  <View style={styles.itemContainer}>
                    <Icon
                      name="tags"
                      type="antdesign"
                      size={15}
                      color={MAINCOLORS.danger}
                    />
                    <Text style={styles.totalText}>Total: {item.count}</Text>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}>
        <ActivityIndicator size="large" color={MAINCOLORS.primary} />
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (!organisation.active_organisation) {
        navigation.navigate('Select Organisation');
      } else if (
        !organisation.active_organisation?.active_authorised_fulfilments
      ) {
        navigation.navigate('Select fullfilment');
      } else {
        reqCountData();
        getNotification();
      }
    }, [organisation, warehouse]),
  );

  return (
    <Layout>
      <Header
        title="Fullfilment"
        useRightIcon
        useLeftIcon
        leftIcon={
          <TouchableOpacity
            style={styles.leftIconContainer}
            onPress={() => navigation.toggleDrawer()}>
            <Icon name="bars" type="font-awesome-5" color="black" size={20} />
          </TouchableOpacity>
        }
        rightIcon={
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <View>
              <Icon
                name="notifications-outline"
                type="ionicon"
                style={styles.notification}
              />
              <Badge
                status="primary"
                value={notification.length}
                containerStyle={styles.badgeContainer}
              />
            </View>
          </TouchableOpacity>
        }
      />
      {renderStat()}
    </Layout>
  );
}

const styles = StyleSheet.create({
  leftIconContainer: {
    marginRight: 18,
  },
  notification: {
    width: 35,
    height: 35,
    padding: 5,
    marginRight: 15,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    left: 18,
  },

  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 0,
  },
  menuItemWrapper: {
    width: '50%',
    padding: 5,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBackground: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: MAINCOLORS.primary,
    marginRight: 10,
  },
  avatar: {
    borderWidth: 0,
  },
  cardStat: {
    borderRadius: 10,
    marginRight: 0,
    marginLeft: 0,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  statDetails: {
    flex: 1,
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
  totalText: {
    fontSize: 12,
    color: '#444',
  },
});
