import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, Pressable } from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@rneui/themed';
import { COLORS } from "~/Utils/Colors";
/* import MenuImage from "../../components/MenuImage/MenuImage"; */

export default function Dashboard(props) {
  const { navigation } = props;
  const warehouse = useSelector(state => state.warehouseReducer);
  const Bluprint = [
    {
      id : 1,
      title : 'Warehouse',
      key:'Warehouse',
      subtitle : 'place to store a all',
      icon : 'warehouse'
    },
    {
      id : 2,
      title : 'Locations',
      key : 'Locations',
      subtitle : 'place to store a pallet',
      icon : 'location-pin'
    },
    {
      id : 3,
      title : 'Pallets',
      key : 'Pallets',
      subtitle : 'place to store a Stored Item',
      icon : 'pallet'
    },
    {
      id : 4,
      title : 'Stored Items',
      key : 'StoredItems',
      subtitle : 'place to store a Stored Item',
      icon : 'brunch-dining'
    }
  ].filter((item)=> {
    console.log(Object.keys(warehouse).length == 0,warehouse)
    if(Object.keys(warehouse).length != 0) return true
    else if (item.key == "Warehouse") return true
    else return false
  })


  const onPressMenu = (item) => {
    navigation.navigate(item.key);
  };

  const renderListItem = ({ item }) => (
    <TouchableHighlight onPress={() => onPressMenu(item)}>
      <View style={styles.container}>
       <Icon
        name={item.icon}
        type='material-icons'
        color={COLORS.primary}
        size={150}
        style={styles.photo}
      />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
     <FlatList 
        vertical 
        showsVerticalScrollIndicator={false} 
        numColumns={2} 
        data={Bluprint} 
        renderItem={renderListItem} 
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
