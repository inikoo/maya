import React from 'react';
import {View, Text, StyleSheet, StyleProp, TextStyle} from 'react-native';

interface DetailRowProps {
  title?: string;
  text?: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const DetailRow: React.FC<DetailRowProps> = ({
  title = '-',
  text = '-',
  titleStyle,
  textStyle,
}) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.title, titleStyle]}>{title}:</Text>
      {typeof text === 'string' || typeof text === 'number' ? (
        <Text style={[styles.text, textStyle]}>
          {typeof text === 'string' || typeof text === 'number' ? text : ''}
        </Text>
      ) : (
        text
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
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
