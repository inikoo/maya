import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DetailRow = ({title = "", text = "", titleStyle = null, textStyle = null}) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.title, titleStyle]}>
        {title}:
      </Text>
      <Text style={[styles.text, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

DetailRow.defaultProps = {
  title: '-',
  text: '-',
  titleStyle: {},
  textStyle: {},
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center', // Ensures title and text are vertically aligned
  },
  title: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});

export default DetailRow;
