import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailRow = ({ title, text }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{typeof title === 'function' ? title() : title}:</Text>
      <Text style={styles.text}>{typeof text === 'function' ? text() : text}</Text>
    </View>
  );
};

DetailRow.defaultProps = {
  title: '-',
  text: '-',
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 5,
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
