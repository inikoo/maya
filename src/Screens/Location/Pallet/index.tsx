import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList';
import { useNavigation } from '@react-navigation/native';
import {Avatar, Icon} from '@rneui/themed';

const LocationPallet = (props) => {
  const navigation = useNavigation()
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const location = props.route.params.location

  const Item = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Pallet',{pallete : item})}>
        <View style={styles.row}>
          <Avatar
            size={40}
            icon={{name: 'pallet', type: 'FontAwesome6'}}
            containerStyle={{backgroundColor: '#9700b9', marginRight: 13}}
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
         urlKey='location-pallate-index' 
            navigation={props.navigation}
            args={[
                oraganisation.active_organisation.id,
                warehouse.id,
                oraganisation.active_organisation.active_authorised_fulfilments.slug,
                location.slug
            ]} 
            params={{ 'pallets_filter[located]' : false }}
            renderItem={Item} 
        />
    </View>
  );
};

export default LocationPallet;

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
    description:{
      fontSize : 12,
      marginLeft : 3,
      marginRight : 3
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
  
