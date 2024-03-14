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
import BaseList from '~/Components/Base/BaseList'
import { useNavigation } from '@react-navigation/native';
import { isNull } from 'lodash'

const Pallete = (props) => {
  const navigation = useNavigation()
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const location = props.route.params.location

  const Item = ({item}) => {
    return (
      <Card style={styles.card}  onPress={() => navigation.navigate('pallete Detail',{pallete : item})}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.avatarTitleContainer}>
            <Avatar.Icon
              icon="google-maps"
              style={styles.avatarStyle}
              size={50}
            />
            <View style={styles.cardSubtitleContainer}>
              <Text style={styles.cardTitle}>{item.slug}</Text>
              <Text style={styles.cardSubtitle}>
                customer_name: {isNull(item.customer_name) ? '-' : item.customer_name}
              </Text>
              <Text style={styles.cardSubtitle}>
               {item.state}
              </Text>
              <Text style={styles.cardSubtitle}>
                {item.status}
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
       <BaseList 
            urlKey='location-pallate-index' 
            args={[
                oraganisation.active_organisation.id,
                warehouse.id,
                oraganisation.active_organisation.active_authorised_fulfilments.slug,
                location.slug
            ]} 
            renderItem={Item} 
            ListHeaderComponent={ListHeaderComponent}
        />
    </View>
  );
};

export default Pallete;

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
