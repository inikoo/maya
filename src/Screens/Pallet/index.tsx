import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList';
import {useNavigation} from '@react-navigation/native';
import {Icon,Dialog} from '@rneui/themed';
import {MAINCOLORS,COLORS } from '~/Utils/Colors';
import Information from '~/Components/palletComponents/Information';

const Pallet = props => {
  const navigation = useNavigation();
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [openDialog, setOpenDialog] = useState(false);

  const setDialog = () => {
    setOpenDialog(!openDialog);
  }

  const Item = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Pallet',{pallet : item})}
        style={styles.container}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.reference}</Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.row}>
              <Icon
                {...item.state_icon.app}
                size={15}
                style={{...styles.icon}}
              />
              <Icon
                 {...item.status_icon.app}
                size={15}
                style={styles.icon}
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
        urlKey="pallet-index"
        navigation={props.navigation}
        args={[
          oraganisation.active_organisation.id,
          warehouse.id,
          oraganisation.active_organisation.active_authorised_fulfilments.id,
        ]}
        renderItem={Item}
        title='Pallet'
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

export default Pallet;

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
});
