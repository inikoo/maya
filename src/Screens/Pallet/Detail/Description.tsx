// Import necessary components
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Text} from '@rneui/themed';
import {defaultTo} from 'lodash';


function Description(props) {

  const DetailRow = ({title, text}) => (
    <View style={styles.descriptionRow}>
      <Text style={styles.descriptionTitle}>{title}</Text>
      <Text style={styles.descriptionText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.descriptionContainer}>
      <DetailRow
        title="Customer Name"
        text={defaultTo(props.data.customer_name, '-')}
      />
      <DetailRow title="Status" text={defaultTo(props.data.status, '-')} />
      <DetailRow title="State" text={defaultTo(props.data.state, '-')} />
      <DetailRow
        title="Location"
        text={defaultTo(props.data.location.slug, '-')}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  descriptionContainer: {
    marginVertical: 10,
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  descriptionText: {
    flex: 1,
  },
});

export default Description;
