import React from 'react';
import { View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

interface DetailRowProps {
  title?: string;
  text?: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const DetailRow: React.FC<DetailRowProps> = ({ title = '-', text = '-', titleStyle, textStyle }) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.title, titleStyle]}>
        {title}:
      </Text>
      <View style={[styles.text, textStyle]}>
        {typeof text === 'string' ? <Text>{text}</Text> : text}
      </View>
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
