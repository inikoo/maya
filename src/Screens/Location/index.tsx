import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Icon} from '@rneui/themed'; // Import Icon from your icon library
import { COLORS } from '~/Utils/Colors';

const Locations = (props) => {
  const navigation = useNavigation();
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  const Item = ({item}) => {
    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate('Location',{location : item})}
        style={styles.container}>
        <View>
          <View style={styles.row}>
          <Avatar
            size={40}
            icon={{name: 'location-pin', type: 'material-icons'}}
            containerStyle={{ backgroundColor: COLORS.primary, marginRight: 13}}
          />
            <Text style={styles.title}>
              {item.code}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View>
      <BaseList
        urlKey="locations-index"
        args={[oraganisation.active_organisation.id, warehouse.id]}
        renderItem={Item}
        navigation={props.navigation}
        title='Location'
      />
    </View>
  );
};

export default Locations;

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
    margin : 5
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
  /*  status: (status) => ({
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Light',
    color: status === 'Sudah Selesai' ? WARNA_UTAMA : status === 'Masih Dicuci' ? WARNA_WARNING : WARNA_ABU_ABU,
  }) */
});
