import React, {useCallback} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Header from '~/Components/Header';
import Layout from '~/Components/Layout';
import {Icon} from '@rneui/base';
import {useFocusEffect} from '@react-navigation/native';
import BaseList from '~/Components/BaseList/IndexV2';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Dashboard: React.FC<Props> = props => {
  const navigation = useNavigation();
  const warehouse = useSelector(state => state.warehouseReducer);
  const organisation = useSelector(state => state.organisationReducer);

  useFocusEffect(
    useCallback(() => {
      if (!organisation.active_organisation) {
        navigation.navigate('Select Organisation');
      } else if (
        !organisation.active_organisation?.active_authorised_fulfilments
      ) {
        navigation.navigate('Select fullfilment');
      }
    }, [organisation, warehouse]),
  );

  return (
    <BaseList
      headerProps={{
        useLeftIcon: true,
        leftIcon: (
          <TouchableOpacity
            style={styles.leftIconContainer}
            onPress={() => props.navigation.toggleDrawer()}>
            <Icon name="bars" type="font-awesome-5" color="black" size={20} />
          </TouchableOpacity>
        ),
      }}
      title="Organisation Stock"
      itemKey="name"
      urlKey="org-stock-index"
      args={[organisation.active_organisation.id, warehouse.id]}
      params={{
        ['filter[state]'] : ["active","discontinuing"]
      }}
      enableSwipe={false}
      height={520}
      sortSchema="code"
      screenNavigation={'Location Scanner'}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  leftIconContainer: {
    marginRight: 18,
  },
  notification: {
    width: 35,
    height: 35,
    padding: 5,
  },
});

export default Dashboard;
