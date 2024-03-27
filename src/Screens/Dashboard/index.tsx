import React from 'react';
import {FlatList, View, TouchableHighlight} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import {COLORS} from '~/Utils/Colors';
import {Icon, Text, Button} from '@rneui/themed';
import {v4 as uuidv4} from 'uuid';
import BorderIcon from '~/Components/BorderIcon';

export default function Dashboard(props) {
  const {navigation} = props;
  const warehouse = useSelector(state => state.warehouseReducer);
  const organisation = useSelector(state => state.organisationReducer);
  const Bluprint = [
    {
      id: uuidv4(),
      title: 'Warehouse',
      key: 'Warehouse',
      icon: {
        name: 'warehouse',
        type: 'material-icons',
        shadowPos: {top: 6, left: 23},
      },
    },
    {
      id: uuidv4(),
      title: 'Delivery',
      key: 'Delivery',
      icon: {
        name: 'truck',
        type: 'font-awesome',
        shadowPos: {top: 0, left: 10},
      },
    },
    {
      id: uuidv4(),
      title: 'Return',
      key: 'Return',
      icon: {
        name: 'trolley',
        type: 'material-icons',
        shadowPos: {top: 0, left: 10},
      },
    },
    {
      id: uuidv4(),
      title: 'Locations',
      key: 'Locations',
      icon: {
        name: 'location-pin',
        type: 'material-icons',
        shadowPos: {top: 0, left: 15},
      },
    },
    {
      id: uuidv4(),
      title: 'Pallets',
      key: 'Pallets',
      icon: {
        name: 'pallet',
        type: 'material-icons',
        shadowPos: {top: 0, left: 10},
      },
    },
    {
      id: uuidv4(),
      title: 'Stored Items',
      key: 'StoredItems',
      icon: {
        name: 'box',
        type: 'entypo',
        shadowPos: {top: 0, left: 24},
      },
    },
  ].filter(item => {
    if (Object.keys(warehouse).length != 0) return true;
    else if (item.key == 'Warehouse') return true;
    else return false;
  });

  const onPressMenu = item => {
    navigation.navigate(item.key);
  };

  const renderListItem = ({item}) => (
    <View>
      <TouchableHighlight
        underlayColor={COLORS.darkGrey}
        style={styles.container}
        onPress={() => onPressMenu(item)}>
        <View>
          <BorderIcon
            name={item.icon.name}
            type={item.icon.type}
            size={50}
            shadowPos={item.icon.shadowPos}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <View>
      {Object.keys(organisation).length != 0 &&
      organisation.active_organisation.active_authorised_fulfilments ? (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={Bluprint}
          renderItem={renderListItem}
          keyExtractor={item => `${item.id}`}
        />
      ) : Object.keys(organisation).length == 0 ? (
        <View style={styles.containerCard}>
           <BorderIcon
             name="warning-amber"
             type="material-icons"
             color={COLORS.primary}
            size={60}
            shadowPos={{top: 7, left: 3}}
          />
          <Text style={styles.titleCard}>
            You need set up organisation first !
          </Text>
          <Button
            title="Set up"
            color={COLORS.primary}
            onPress={() => navigation.navigate('Organisation')}
          />
        </View>
      ) : (
        <View style={styles.containerCard}>
          <BorderIcon
             name="warning-amber"
             type="material-icons"
             color={COLORS.primary}
            size={60}
            shadowPos={{top: 7, left: 3}}
          />
          <Text style={styles.titleCard}>
            You need set up Fullfilment first !
          </Text>
          <Button
            title="Set up"
            color={COLORS.primary}
            onPress={() => navigation.navigate('Fullfilment')}
          />
        </View>
      )}
    </View>
  );
}
