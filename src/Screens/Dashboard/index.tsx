import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, Pressable } from "react-native";
import styles from "./styles";
import Location from '../../assets/image/location.jpg'
import Warehouse from '../../assets/image/warehouse.jpeg'
import StoredItem from '../../assets/image/stored_items.webp'
import Pallet from '../../assets/image/pallet.jpg'
import { RemoveCredential } from '~/Utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import Action from '~/Store/Action';
/* import MenuImage from "../../components/MenuImage/MenuImage"; */

export default function Dashboard(props) {
  const { navigation } = props;
  const dispatch = useDispatch()
  const warehouse = useSelector(state => state.warehouseReducer);
  const Bluprint = [
    {
      id : 1,
      title : 'Warehouse',
      key:'Warehouse',
      subtitle : 'place to store a all',
      image : Warehouse
    },
    {
      id : 2,
      title : 'Locations',
      key : 'Locations',
      subtitle : 'place to store a pallet',
      image : Location
    },
    {
      id : 3,
      title : 'Pallets',
      key : 'Pallets',
      subtitle : 'place to store a Stored Item',
      image : Pallet
    },
    {
      id : 4,
      title : 'Stored Items',
      key : 'StoredItems',
      subtitle : 'place to store a Stored Item',
      image : StoredItem
    }
  ].filter((item)=> {
    if(warehouse) return true
    else if (item.key == Warehouse) return true
    else return false
  })


  const onPressMenu = (item) => {
    navigation.navigate(item.key);
  };

  const renderListItem = ({ item }) => (
    <TouchableHighlight underlayColor="orange" onPress={() => onPressMenu(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.subtitle}</Text>
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
      <Pressable
        onPress={() => {
          RemoveCredential();
          dispatch(Action.DestroyUserSessionProperties());
        }}>
        <Text>logout</Text>
      </Pressable>
    </View>
  );
}
