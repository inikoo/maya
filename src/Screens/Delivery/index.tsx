import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Text} from '@rneui/themed'; // Import Icon from your icon library
import { COLORS, MAINCOLORS } from '~/Utils/Colors';
import { CheckBox } from '@rneui/base';

const Delivery = (props) => {
  const navigation = useNavigation();
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  const Item = ({item}) => {
    console.log('delivery',item)
    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate('Delivery',{delivery : item})}
        style={styles.container}>
        <View>
          <View style={styles.row}>
          <Avatar
            size={40}
            icon={{name: 'truck', type: 'font-awesome', color:MAINCOLORS.white}}
            containerStyle={{ backgroundColor: MAINCOLORS.primary, marginRight: 13}}
          />
            <Text style={styles.title}>
              {item.reference}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
      <BaseList
        urlKey='delivery-index'
        args={[oraganisation.active_organisation.id, warehouse.id]}
        renderItem={Item}
        navigation={props.navigation}
        title='Delivery'
      />
  );
};

export default Delivery;

const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignItems: 'center',
    margin : 5,
    borderWidth : 1,
    borderColor: COLORS.grey6
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  description: {
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
