import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Text, Icon } from '@rneui/themed';
import  {COLORS } from '~/Utils/Colors';
import {IconColor} from '~/Utils';

const Locations = props => {
  const navigation = useNavigation();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [openDialog, setOpenDialog] = useState(false);

  const setDialog = () => {
    setOpenDialog(!openDialog);
  };

  const Item = (record) => {
    return (
      <TouchableOpacity
      onPress={() =>
          navigation.navigate('Location', {location: record})
      }
        style={{
          ...styles.container,
          backgroundColor: 'white'
        }}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{record.code}</Text>
          </View>
         {/*  <View style={styles.iconContainer}>
            <View style={styles.row}>
              <Icon
                name="box"
                type="font-awesome-5"
                size={15}
                style={{...styles.icon}}
                color={IconColor(record.allow_stocks, record.has_stock_slots)}
              />
              <Icon
                name="hand-holding-water"
                type="font-awesome-5"
                size={15}
                style={styles.icon}
                color={IconColor(
                  record.allow_dropshipping,
                  record.has_dropshipping_slots,
                )}
              />
              <Icon
                name="pallet"
                type="font-awesome-5"
                size={15}
                style={styles.icon}
                color={IconColor(
                  record.allow_fulfilment,
                  record.has_fulfilment,
                )}
              />
            </View>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <BaseList
        title="Location"
        itemKey='code'
        urlKey="locations-index"
        args={[organisation.active_organisation.id, warehouse.id]}
        enableSwipe={false}
        sortSchema='code'
        itemList={Item}
        screenNavigation={'Location Scanner'}
      />
    </>
  );
};

export default Locations;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    margin: 5,
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
});
