import React,{useCallback, } from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Header from '~/Components/Header';
import Layout from '~/Components/Layout'
import { Icon } from '@rneui/base';
import {useFocusEffect} from '@react-navigation/native';

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
    <Layout>
      <Header
        title="SKU"
      />
      <View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('Scan')}>
        <Text>Dashboard SKU</Text>
        </TouchableOpacity>
      </View>
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
