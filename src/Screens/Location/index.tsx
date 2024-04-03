import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList';
import {useNavigation} from '@react-navigation/native';
import {Text, Icon, Dialog} from '@rneui/themed';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';

const Locations = props => {
  const navigation = useNavigation();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [openDialog, setOpenDialog] = useState(false);

  const IconColor = (allow, stock) => {
    if (allow && stock) return MAINCOLORS.success;
    if (!allow && stock) return MAINCOLORS.warning;
    return COLORS.black; // default color if neither allow nor stock
  };

  const setDialog = () => {
    setOpenDialog(!openDialog);
  };

  const Item = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Location', {location: item})}
        style={styles.container}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.code}</Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.row}>
              <Icon
                name="box"
                type="font-awesome-5"
                size={15}
                style={{...styles.icon}}
                color={IconColor(item.allow_stocks, item.has_stock_slots)}
              />
              <Icon
                name="hand-holding-water"
                type="font-awesome-5"
                size={15}
                style={styles.icon}
                color={IconColor(
                  item.allow_dropshipping,
                  item.has_dropshipping_slots,
                )}
              />
              <Icon
                name="pallet"
                type="font-awesome-5"
                size={15}
                style={styles.icon}
                color={IconColor(item.allow_fulfilment, item.has_fulfilment)}
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
        <View style={styles.row}>
          <Icon
            name="box"
            type="font-awesome-5"
            size={10}
            style={{...styles.icon, marginRight: 10}}
            color={COLORS.black}
          />
          <Text style={styles.dialogText}>Stock</Text>
        </View>
        <View style={styles.row}>
          <Icon
            name="hand-holding-water"
            type="font-awesome-5"
            size={10}
            style={{...styles.icon, marginRight: 10}}
            color={COLORS.black}
          />
          <Text style={styles.dialogText}>Dropshipping</Text>
        </View>
        <View style={styles.row}>
          <Icon
            name="pallet"
            type="font-awesome-5"
            size={10}
            style={{...styles.icon, marginRight: 10}}
            color={COLORS.black}
          />
          <Text style={styles.dialogText}>Fulfilment</Text>
        </View>

        <View style={styles.row}>
          <Icon
            name="dot-fill"
            type="octicon"
            size={10}
            style={{...styles.icon, marginRight: 10}}
            color={MAINCOLORS.success}
          />
          <Text style={styles.dialogText}>Pallets still accommodated.</Text>
        </View>

        <View style={styles.row}>
          <Icon
            name="dot-fill"
            type="octicon"
            size={10}
            style={{...styles.icon, marginRight: 10}}
            color={MAINCOLORS.warning}
          />
          <Text style={styles.dialogText}>Location packed with pallets</Text>
        </View>
        <View style={styles.row}>
          <Icon
            name="dot-fill"
            type="octicon"
            size={10}
            style={{...styles.icon, marginRight: 10}}
          />
          <Text style={styles.dialogText}>Location is inactive</Text>
        </View>
      </Dialog>
    </>
  );
};

export default Locations;

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
  dialogText: {
    fontSize: 12,
    fontFamily: 'TitilliumWeb-Regular',
  },
});
