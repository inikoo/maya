import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Text, Icon, Card} from '@rneui/themed';

import {PropsScreens, reduxData, LocationTypesIndex } from '~/Utils/types'


const Locations = (props : PropsScreens) => {
  const navigation = useNavigation();
  const organisation = useSelector((state :reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);

  const Item = (record : LocationTypesIndex) => {
    return (
      <View style={{backgroundColor: '#ffffff'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Location', {location: record})}>
          <Card containerStyle={styles.cardStat}>
            <Text style={styles.labelStat}>{record.code}</Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <BaseList
        title="Location"
        itemKey="code"
        urlKey='warehouse-area-location'
        args={[organisation.active_organisation.id, warehouse.id, props.route.params.area.id]}
        enableSwipe={false}
        sortSchema="code"
        itemList={Item}
        screenNavigation={'Location Scanner'}
      />
    </>
  );
};

export default Locations;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'Inter',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  leftIconContainer: {
    marginRight: 18,
  },
  cardStat: {
    borderRadius: 10,
    paddingVertical: 20,
    marginTop: 10,
    marginRight: 0,
    marginLeft: 0,
    backgroundColor: '#FAFAFA',
  },
  labelStat: {
    fontSize: 14,
    fontWeight: '700',
  },
});