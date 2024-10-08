import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSeedling,
  faShare,
  faSpellCheck,
  faCheck,
  faTimes,
  faCheckDouble,
  faSignOutAlt,
  faFragile,
  faGhost,
  faWarehouseAlt,
  faSadCry,
  faArrowAltFromLeft,
  faPallet,
  faBox,
  faSortSizeUp
} from 'assets/fa/pro-light-svg-icons';
import {findColorFromAiku} from '~/Utils';

library.add(
  faSeedling,
  faShare,
  faSpellCheck,
  faCheck,
  faTimes,
  faCheckDouble,
  faSignOutAlt,
  faFragile,
  faGhost,
  faWarehouseAlt,
  faSadCry,
  faArrowAltFromLeft,
  faPallet,
  faBox,
  faSortSizeUp
);

const StoredItemCard = props => {
  const navigation = useNavigation();

  return (
    <View style={{...styles.container,  backgroundColor: props.data.bulkValue.includes(props.data.record.id) ? MAINCOLORS.primary : 'white'}}>
      <TouchableOpacity
       /*  onPress={() =>
          navigation.navigate('Pallet', {pallet: props.data.record})
        } */
        onLongPress={()=>props.data.onLongPress(props.data.record)}
      >
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{props.data.record?.reference}</Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.row}>
              <FontAwesomeIcon
                icon={props.data.record?.state_icon.icon}
                size={15}
                color={findColorFromAiku(props.data.record?.state_icon.color)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StoredItemCard;

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
    marginVertical: 5,
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
    gap:10
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
  description : {
    fontSize : 12,
    color: COLORS.grey6,
    marginVertical : 3
  }
});
