import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, BottomSheet} from '@rneui/themed';
import {MAINCOLORS} from '~/Utils/Colors';
import MultipleChekbox from '~/Components/MultipleChekbox';
import Header from '~/Components/Header';
import {Divider, Icon} from '@rneui/base';
import Button from '~/Components/Button';

type Props = {
  blueprint: any[];
  onChangeFilter: (filter: object) => void;
  onResetFilter: () => void;
  value: {[key: string]: any};
  onClose: () => void;
  isVisible: boolean;
};

const Filter = (props: Props) => {
  const [finalValue, setFinalValue] = useState<{[key: string]: any}>(
    props.value,
  );

  const onValueChange = (key: string, newValue: any) => {
    setFinalValue(prevValue => ({
      ...prevValue,
      [key]: newValue,
    }));
  };

  const renderItem = (e: any) => {
    return (
      <View key={e.key} style={styles.filterContainer}>
        <Text style={styles.label}>{e.title} : </Text>
        <View>
          {e.type === 'checkBox' && (
            <MultipleChekbox
              options={e.propsItem.options}
              value={props.value[e.key]}
              onChange={(d: any) => onValueChange(e.key, d)}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <BottomSheet isVisible={props.isVisible}>
      <View style={styles.wrapper}>
        <Header
          title={
            <View style={styles.headerFilterContainer}>
              <Icon name="filter" type="feather" color="black" />
              <Text style={styles.title}>Filter</Text>
            </View>
          }
          rightIcon={
            <TouchableOpacity onPress={props.onClose} style={{marginRight: 20}}>
              <Icon
                color={MAINCOLORS.danger}
                name="closecircle"
                type="antdesign"
                size={20}
              />
            </TouchableOpacity>
          }
        />
        <Divider />

        <View style={{marginBottom: 20}}>
          {props.bluprint.map(e => renderItem(e))}
        </View>

        {/* Buttons */}

        <View style={styles.buttonContainer}>
          <View style={{width: '50%'}}>
            <Button
              title="Reset"
              type="secondary"
              onPress={() => props.onChangeFilter({})}
            />
          </View>
          <View style={{width: '50%'}}>
            <Button
              title="Apply"
              onPress={() => props.onChangeFilter(finalValue)}
            />
          </View>
        </View>

        {/* <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => props.onChangeFilter({})}>
            <Text style={[styles.buttonText, {color: MAINCOLORS.primary}]}>
              Reset
            </Text>
          </TouchableOpacity> */}
      </View>
    </BottomSheet>
  );
};

Filter.defaultProps = {
  blueprint: [],
  onChangeFilter: () => null,
  onResetFilter: () => null,
  value: {},
  onClose: () => null,
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
  },
  loginButton: {
    backgroundColor: MAINCOLORS.primary,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  cancelButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: MAINCOLORS.primary,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  headerFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  filterContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 25,
    gap: 10,
  },
});

export default Filter;
