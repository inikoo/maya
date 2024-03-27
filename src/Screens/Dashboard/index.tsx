import React, {useLayoutEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  Pressable,
  Button,
} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '~/Utils/Colors';
import {PricingCard, lightColors, Icon} from '@rneui/themed';
/* import MenuImage from "../../components/MenuImage/MenuImage"; */

export default function Dashboard(props) {
  const {navigation} = props;
  const warehouse = useSelector(state => state.warehouseReducer);
  const organisation = useSelector(state => state.organisationReducer);
  const Bluprint = [
    {
      id: 1,
      title: 'Warehouse',
      key: 'Warehouse',
      subtitle: 'place to store a all',
      icon: 'warehouse',
    },
    {
      id: 2,
      title: 'Locations',
      key: 'Locations',
      subtitle: 'place to store a pallet',
      icon: 'location-pin',
    },
    {
      id: 3,
      title: 'Pallets',
      key: 'Pallets',
      subtitle: 'place to store a Stored Item',
      icon: 'pallet',
    },
    {
      id: 4,
      title: 'Stored Items',
      key: 'StoredItems',
      subtitle: 'place to store a Stored Item',
      icon: 'brunch-dining',
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
    <TouchableHighlight onPress={() => onPressMenu(item)}>
      <View style={styles.container}>
        <Icon
          name={item.icon}
          type="material-icons"
          color={COLORS.primary}
          size={150}
          style={styles.photo}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableHighlight>
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
          <Icon
            name="warning-amber"
            type="material-icons"
            color={COLORS.primary}
            size={60}
            style={{marginBottom: 10}}
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
          <Icon
            name="warning-amber"
            type="material-icons"
            color={COLORS.primary}
            size={60}
            style={{marginBottom: 10}}
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
