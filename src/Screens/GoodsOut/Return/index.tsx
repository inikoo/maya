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
  faPallet,
  faNarwhal,
} from 'assets/fa/pro-light-svg-icons';

library.add(
  faSeedling,
  faShare,
  faSpellCheck,
  faCheck,
  faTimes,
  faCheckDouble,
  faPallet,
  faNarwhal,
);

const Returns = props => {
  const navigation = useNavigation();
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  const Item = record => {
    return (
      <View style={{...styles.container, backgroundColor: 'white'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Return', {return: record})}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{record.reference}</Text>
              <View style={{marginTop: 5, marginHorizontal: 2}}>
                <Text style={{...styles.description, marginRight: 3}}>
                  Customer Reference : {record.customer_reference || '-'}
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

                <FontAwesomeIcon
                  icon={record.type_icon.icon}
                  size={20}
                  color={findColorFromAiku(record.type_icon.color)}
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
      title="Pallet Returns"
      itemKey="reference"
      urlKey="return-index"
      args={[oraganisation.active_organisation.id, warehouse.id]}
      itemList={Item}
      sortSchema="reference"
      screenNavigation={'Pallet Scanner'}
      filterSchema={[
        {
          title: 'type',
          key: 'elements[type]',
          type: 'checkBox',
          propsItem: {
            options: [
              {
                label: 'Pallet',
                value: 'pallet',
              },
              {
                label: 'Stored Items',
                value: 'stored_item',
              },
            ],
          },
        },
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
                label: 'Picking',
                value: 'picking',
              },
              {
                label: 'Picked',
                value: 'picked',
              },
              {
                label: 'Dispatched',
                value: 'dispatched',
              },
              {
                label: 'Cancel',
                value: 'cancel',
              },
            ],
          },
        },
      ]}
    />
  );
};

export default Returns;

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
    gap: 10,
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
