import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Icon, Dialog} from '@rneui/themed';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import Accordion from 'react-native-collapsible/Accordion';

const Information = props => {
  return (
    <>
      <View style={{padding: 5}}>
        <Text style={{fontWeight: '800'}}>- State -     </Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="seedling"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>In process</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="share"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Submitted</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="spell-check"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Confirmed</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="check"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Received</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="times"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Not Received</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="check"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Booking in</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="check-double"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Storing</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="sign-out-alt"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Dispatched</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="check"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Picking</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="check"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Picked</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="glass-fragile"
          type="material-community"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Damaged</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="ghost"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Not Picked</Text>
      </View>

      <View style={{padding: 5}}>
        <Text style={{fontWeight: '800'}}>- Status -</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="seedling"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>In process</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="times"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>not received</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="check-double"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Storing</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="sad-cry"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Incident</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="check"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Returning</Text>
      </View>
      <View style={styles.row}>
        <Icon
          name="check"
          type="font-awesome-5"
          size={10}
          style={{...styles.icon, marginRight: 10}}
          color={COLORS.black}
        />
        <Text style={styles.dialogText}>Returned</Text>
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
