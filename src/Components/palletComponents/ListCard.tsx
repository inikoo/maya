import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {COLORS } from '~/Utils/Colors';

const PalletCard = props => {
  console.log(props)
  const navigation = useNavigation();

  return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Pallet',{pallet : props.data})}
        style={styles.container}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{props.data.reference}</Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.row}>
              <Icon
                {...props.data.state_icon.app}
                size={15}
                style={{...styles.icon}}
              />
              <Icon
                 {...props.data.status_icon.app}
                size={15}
                style={styles.icon}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
  );
};

export default PalletCard;

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
