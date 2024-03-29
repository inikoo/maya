import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Icon} from '@rneui/themed'; // Import Icon from your icon library
import { COLORS } from '~/Utils/Colors';

const Pallet = props => {
  const navigation = useNavigation();
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);

  const Item = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Pallet',{pallete : item})}>
        <View style={styles.row}>
          <Avatar
            size={40}
            icon={{name: 'pallet', type: 'FontAwesome6'}}
            containerStyle={{backgroundColor: COLORS.primary , marginRight: 13}}
          />
          <View style={styles.row}>
            <View style={styles.text}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.reference}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.description}>{item.state_label}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <BaseList
        urlKey="pallate-index"
        navigation={props.navigation}
        args={[
          oraganisation.active_organisation.id,
          warehouse.id,
          oraganisation.active_organisation.active_authorised_fulfilments.slug,
        ]}
        params={{'pallets_filter[located]': false}}
        renderItem={Item}
        title='Pallets'
      />
    </View>
  );
};

export default Pallet;

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
    margin: 5,
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
