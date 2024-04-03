import React from 'react';
import {StyleSheet, View } from 'react-native';
import {Text, Icon, Dialog} from '@rneui/themed';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';

const Information = props => {
  return (
    <>
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
    </>
  );
};

export default Information;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  dialogText: {
    fontSize: 12,
    fontFamily: 'TitilliumWeb-Regular',
  },
});
