import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';

export default function PalletCard(p) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Pallet',{pallet : p.data.model})}
      style={styles.cardContainer}>
      <View>
        <View style={styles.row}>
          <Avatar
            size={40}
            icon={{name: 'pallet', type: 'FontAwesome6'}}
            containerStyle={{backgroundColor: '#9700b9', marginRight: 13}}
          />
          <Text style={styles.title}>{p.data.model.slug}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
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
  cardContainer: {
    width: 350,
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
  },
});
