import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Card, Icon} from '@rneui/themed'; 
import {reduxData} from '~/types/types';
import {COLORS} from '~/Utils/Colors';
import dayjs from 'dayjs';

const DeliveryNotes = props => {
  const oraganisation = useSelector((state : reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);
  const navigation = useNavigation()


/*   const itemList = record => {
    return (
      <View style={{backgroundColor: '#ffffff'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('ShowDeliveryNote',{ deliveryNote : record })}>
          <Card containerStyle={styles.cardStat}>
            <Text style={styles.labelStat}>{record.reference}</Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }; */

  const itemList = record => {
    return (
      <View style={{...styles.container, backgroundColor: 'white'}}>
        <TouchableOpacity
        onPress={()=>navigation.navigate('ShowDeliveryNote',{ deliveryNote : record })}
        >
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{record.reference}</Text>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                <Text style={{...styles.description, marginRight : 3}}>
                  type : {record.type}  |  
                </Text>
                
                <Text style={styles.description}>
                  Date :{'  '}
                  { record.date ? 
                    dayjs(record.date).format('DD-MM-YYYY') : '-'
                  }
                </Text>
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
      itemList={itemList}
      useScan={false}
      title="Delivery Notes"
      itemKey="reference"
      urlKey="delivery-notes-index"
      args={[oraganisation.active_organisation.id, warehouse.id]}
      sortSchema="reference"
      screenNavigation={'Pallet Scanner'}
    />
  );
};

export default DeliveryNotes;

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
