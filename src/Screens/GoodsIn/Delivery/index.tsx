import React from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Icon, Text} from '@rneui/themed';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {findColorFromAiku} from '~/Utils';
import dayjs from 'dayjs';
import {defaultTo} from 'lodash';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSeedling,
  faShare,
  faCheck,
  faTimes,
  faCheckDouble,
  faSpellCheck,
} from 'assets/fa/pro-light-svg-icons';

library.add(faSeedling, faShare, faSpellCheck, faCheck, faTimes, faCheckDouble);

const Delivery = props => {
  const navigation = useNavigation();
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  const Item = record => {
    return (
      <View style={{...styles.container, backgroundColor: 'white'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Delivery', {delivery: record})}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{record.reference}</Text>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                <Text style={{...styles.description, marginRight : 3}}>
                  Pallet : {record.number_pallets}  |  
                </Text>
                
                <Text style={styles.description}>
                  Estimate Date :{'  '}
                  { record.estimated_delivery_date ? 
                    dayjs(record.estimated_delivery_date).format('DD-MM-YYYY') : '-'
                  }
                </Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <View style={styles.row}>
                <FontAwesomeIcon
                  icon={record.state_icon.icon}
                  size={20}
                  color={findColorFromAiku(record.state_icon.color)}
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
      title="Fullfilmennt Deliveries"
      itemKey="reference"
      urlKey="delivery-index"
      args={[oraganisation.active_organisation.id, warehouse.id]}
      itemList={Item}
      params={{
        ['filter[state]']: [
          'confirmed',
          'not-recived',
          'booked-in',
          'received',
          'booking-in',
        ],
      }}
      sortSchema="reference"
      filterSchema={[
        {
          title: 'State',
          key: 'elements[state]',
          type: 'checkBox',
          propsItem: {
            options: [
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
  leftIconContainer: {
    marginRight: 18,
  },
  description: {
    fontSize: 12,
    color: COLORS.grey6,
  },
});
