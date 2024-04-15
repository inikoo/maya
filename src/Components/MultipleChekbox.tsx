import React, {useState, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, CheckBox} from '@rneui/themed';

const Filter = props => {
  const [value, setValue] = useState([]);

  const handleChange = (e) => {
    const temp = value.map(item => {
      if (e === item.value) {
        return {...item, checked: !item.checked};
      }
      return item;
    });
    setValue(temp);
    const finalData = temp.filter(item => item.checked).map(item => item.value);
    props.onChange(finalData);
  };
  


  useEffect(() => {
    const finalOptions = props.options.map(item => {
      return { ...item,  checked: props.value.includes(item.value)}
    })
    setValue(finalOptions);
  }, []);
  
  

  return (
    <View>
      {value.map((item, index) => (
        <View key={index} style={styles.checkboxContainer}>
          <CheckBox
            checked={item.checked}
            onPress={() => {
              handleChange(item.value);
            }}
          />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

Filter.defaultProps = {
  options: [],
  value : [],
  onChange : ()=> null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default Filter;
