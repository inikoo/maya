import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Text, Button } from '@rneui/themed';
import { MAINCOLORS} from '~/Utils/Colors';
import {get} from 'lodash';
import MultipleChekbox from '~/Components/MultipleChekbox';

const Filter = props => {
  const [finalValue, setfinalValue] = useState([]);

  const onValueChange = (key, newValue) => {
    let finalData = finalValue;
    finalData[key] = newValue;
    setfinalValue(finalData);
  };

  const renderItem = e => {
    return (
      <View>
        <Text>{e.title}</Text>
        <View>
          <MultipleChekbox
            options={e.propsItem.options}
            value={props.value[e.key]}
            onChange={d => onValueChange(e.key, d)}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={{marginBottom: 20}}>
        {props.bluprint.map(e => renderItem(e))}
      </View>
      <Button onPress={()=>props.onChangeFilter(finalValue)} buttonStyle={styles.loginButton} title="Apply" />
    </View>
  );
};

Filter.defaultProps = {
  bluprint: [],
  onChangeFilter: () => null,
  value : []
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: MAINCOLORS.primary,
    padding: 8,
    borderRadius: 10,
  },
});

export default Filter;
