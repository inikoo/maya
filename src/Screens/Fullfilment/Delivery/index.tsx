import React from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Icon, Text} from '@rneui/themed'; // Import Icon from your icon library
import {COLORS, MAINCOLORS} from '~/Utils/Colors';

const Delivery = props => {
  const navigation = useNavigation();
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  const Item = record => {
    return (
      <View style={{...styles.container, backgroundColor: 'white'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Delivery', {delivery: record})}
        >
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{record.reference}</Text>
            </View>
            <View style={styles.iconContainer}>
              <View style={styles.row}>
                <Icon
                  {...record.state_icon.app}
                  size={15}
                  style={{...styles.icon}}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BaseList
      title="Deliveries"
      itemKey="reference"
      urlKey="delivery-index"
      args={[oraganisation.active_organisation.id, warehouse.id]}
      itemList={Item}
      sortSchema="reference"
      filterSchema={[
        {
          title: 'State',
          key: 'elements[state]',
          type: 'checkBox',
          propsItem: {
            options: [
              {
                label: 'in Process',
                value: 'in-process',
              },
              {
                label: 'Submitted',
                value: 'submitted',
              },
              {
                label: 'Confirmed',
                value: 'confirmed',
              },
              {
                label: 'Received',
                value: 'received',
              },
              {
                label: 'Not Received',
                value: 'not-received',
              },
              {
                label: 'Booking In',
                value: 'booking-in',
              },
              {
                label: 'Booked In',
                value: 'booked-in',
              },
            ],
          },
        },
      ]}
    />
  );
};

export default Delivery;

const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.grey6,
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    marginHorizontal: 5,
  },
});
