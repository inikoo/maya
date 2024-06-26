import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList';
import {useNavigation} from '@react-navigation/native';
import {Text, Icon, Dialog} from '@rneui/themed';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {IconColor} from '~/Utils';
import Information from '~/Components/loactionComponents/Information';

const Locations = props => {
  const navigation = useNavigation();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [openDialog, setOpenDialog] = useState(false);

  const setDialog = () => {
    setOpenDialog(!openDialog);
  };

  const Item = (record,{onLongPress , listModeBulk, bulkValue}) => {
    return (
      <TouchableOpacity
        onPress={() => listModeBulk ? onLongPress(record) : navigation.navigate('Location', {location: record})}
        onLongPress={()=>onLongPress(record)}
        style={{...styles.container, backgroundColor: !bulkValue.includes(record.id) ? 'white' : COLORS.grey7 }}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{record.code}</Text>
          </View>
          <View style={styles.iconContainer}>
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
                color={IconColor(record.allow_fulfilment, record.has_fulfilment)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <BaseList
        urlKey="locations-index"
        args={[organisation.active_organisation.id, warehouse.id]}
        renderItem={Item}
        navigation={props.navigation}
        title="Location"
        sort={[
          {
            title: 'Code',
            key: 'code',
          },
        ]}
        settingOptions={[
          {
            icon: {name: 'info', type: 'antdesign'},
            title: 'Info',
            onPress: () => setDialog(),
          },
        ]}
      />
      <Dialog isVisible={openDialog} onBackdropPress={setDialog}>
        <Dialog.Title title="Info" />
        <Information />
      </Dialog>
    </>
  );
};

export default Locations;

const styles = StyleSheet.create({
  container: {
    padding: 17,
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
