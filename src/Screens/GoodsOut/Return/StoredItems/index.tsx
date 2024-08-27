import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Text, Icon} from '@rneui/themed'; // Import Icon from your icon library
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import PalletCard from '~/Components/palletComponents/ListCardReturn';

const StoredItemsinReturns = props => {
  const navigation = useNavigation();
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const returnData = props.route.params.return;

  const Item = record => {
    return (
      <TouchableOpacity style={{...styles.container, backgroundColor: 'white'}}>
        <View>
          <View style={styles.row}>
            <Avatar
              size={40}
              icon={{
                name: 'trolley',
                type: 'material-icons',
                color: MAINCOLORS.white,
              }}
              containerStyle={{
                backgroundColor: MAINCOLORS.primary,
                marginRight: 13,
              }}
            />
            <Text style={styles.title}>{record.reference}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (!returnData) navigation.goBack();
  }, []);

  return (
    <>
    <BaseList
      headerProps={{
        useLeftIcon: true,
      }}
      title={`Stored Items in ${returnData.reference}`}
      itemKey="id"
      urlKey='return-stored-items-index'
      args={[oraganisation.active_organisation.id, warehouse.id, returnData.id]}
      sortSchema="reference"
      screenNavigation={'Pallet Scanner'}
      itemList={(
        record,
        {onLongPress = () => null, listModeBulk = false, bulkValue = []},
      ) => (
        <PalletCard
          data={{
            record: record,
            onLongPress,
            listModeBulk,
            bulkValue,
          }}
        />
      )}
    />
    </>
  );
};

export default StoredItemsinReturns;

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
    borderWidth: 1,
    borderColor: COLORS.grey6,
  },
  title: {
    fontSize: 18,
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
  leftIconContainer: {
    marginRight: 18,
  },
});
