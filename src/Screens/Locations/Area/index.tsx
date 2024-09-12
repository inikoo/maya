import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Text, Icon} from '@rneui/themed';
import {COLORS} from '~/Utils/Colors';
import {warehouseAreaIndexTypes, reduxData, PropsScreens} from '~/types/types';

const Locations = (props: PropsScreens) => {
  const navigation = useNavigation();
  const organisation = useSelector((state: reduxData) => state.organisationReducer);
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);


  const Item = (record: warehouseAreaIndexTypes) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.container,
          backgroundColor: 'white',
        }}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{record.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
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
        useScan={false}
        itemList={Item}
        title="WareHouse Area"
        itemKey="code"
        urlKey="warehouse-area-index"
        args={[organisation.active_organisation.id, warehouse.id]}
        enableSwipe={false}
        sortSchema="code"
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
  leftIconContainer: {
    marginRight: 18,
  },
});
