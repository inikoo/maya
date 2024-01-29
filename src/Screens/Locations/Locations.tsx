import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS} from '~/Constant/Color';
import {Avatar, Card, Badge} from 'react-native-paper';
import {get, toUpper} from 'lodash';
import BaseList from '~/Components/Base/BaseList'
import { useNavigation } from '@react-navigation/native';

const Locations = () => {
  const navigation = useNavigation()
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  const Item = ({item}) => {
    return (
      <Card style={styles.card}  onPress={() => navigation.navigate('locations Detail',{location : item})}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.avatarTitleContainer}>
            <Avatar.Icon
              icon="google-maps"
              style={styles.avatarStyle}
              size={50}
            />
            <View style={styles.cardSubtitleContainer}>
              <Text style={styles.cardTitle}>{item.code}</Text>
              <Text style={styles.cardSubtitle}>
                Warehouse Slug: {toUpper(item.warehouse_slug)}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const ListHeaderComponent=()=>{
    return (
      <TextInput
      style={styles.searchInput}
      placeholder="Search..."
    />
    )
  }

  return (
    <View>
       <BaseList urlKey='locations-index' args={[oraganisation.active_organisation.id,warehouse.id]} renderItem={Item} ListHeaderComponent={ListHeaderComponent}/>
    </View>
  );
};

export default Locations;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffff',
  },
  cardContent: {
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  avatarTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.black,
    marginHorizontal: 10,
  },
  avatarStyle: {
    backgroundColor: COLORS.primary,
  },
  cardSubtitleContainer: {
    padding: 10,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#87D068',
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#A9A9A9',
    marginBottom: 10,
    paddingHorizontal: 10,
    marginHorizontal: 14,
    marginVertical: 10
  },
});
