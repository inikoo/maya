import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const DetailRow = ({title, text, titleStyle, textStyle}) => {
  return (
    <View style={styles.row}>
      <Text style={{...styles.title, ...titleStyle}}>
        {title} :
      </Text>
      <Text style={{...styles.text, ...textStyle}}>
        {text}
      </Text>
    </View>
  );
};

DetailRow.defaultProps = {
  title: <Text>-</Text>,
  text: <Text>-</Text>,
  titleStyle: {},
  textStyle: {},
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
