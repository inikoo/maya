import React, {useCallback} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Header from '~/Components/Header';
import Layout from '~/Components/Layout';
import {Icon} from '@rneui/base';
import {useFocusEffect} from '@react-navigation/native';
import SearchNotif from '~/Components/Search&Notification';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {reduxData, PropsScreens} from '~/Utils/types';


const Dashboard: React.FC<PropsScreens> = props => {
  const navigation = useNavigation();
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);
  const organisation = useSelector(
    (state: reduxData) => state.organisationReducer,
  );

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
    <Layout>
      <>
        <Header
          title="Goods In"
          useLeftIcon={true}
          leftIcon={
            <TouchableOpacity
              style={styles.leftIconContainer}
              onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="bars" type="font-awesome-5" color="black" size={20} />
            </TouchableOpacity>
          }
          rightIcon={<SearchNotif />}
        />

        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Scan')}>
            <Text>Dashboard Goods In</Text>
          </TouchableOpacity>
        </View>
      </>
    </Layout>
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
