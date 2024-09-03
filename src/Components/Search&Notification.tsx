import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {get} from 'lodash';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {Badge} from '@rneui/themed';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faSearch, faBell} from 'assets/fa/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

library.add(faSearch, faBell);

const SearchNotif: React.FC<Props> = props => {
  const navigation = useNavigation();
  const warehouse = useSelector(state => state.warehouseReducer);
  const organisation = useSelector(state => state.organisationReducer);
  const [notification, setNotification] = useState([]);

  const getNotification = () => {
    if (organisation.active_organisation && warehouse.id) {
      Request(
        'get',
        'notification',
        {},
        {[`notifications_filter[filter]`]: 'unread'},
        [],
        (res: any) => setNotification(res.data),
        (res: any) => {
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

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <View style={{flexDirection: 'row', gap: 20}}>
      <TouchableOpacity onPress={() => navigation.navigate('Scanner Global')}>
        <View>
          <FontAwesomeIcon icon={faSearch} size={20} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <View>
          <FontAwesomeIcon icon={faBell} size={20} />
          <Badge
            status="primary"
            value={notification.length}
            containerStyle={styles.badgeContainer}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: -10,
    left: 8,
  },
});

export default SearchNotif;
