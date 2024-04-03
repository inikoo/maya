import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Icon, Text, Button} from '@rneui/themed';
import {COLORS} from '~/Utils/Colors';
import {noop} from 'lodash';

const Empty = props => {
  return (
    <View style={styles.container}>
      {props.useImage ? (
        <Icon
          name={props.icon.name}
          type={props.icon.type}
          size={props.icon.size}
          color={props.icon.color}
        />
      ) : (
        <View style={{height: 300, width: 300}}>
          <Image
            source={require('../../assets/image/9264822.jpg')}
            style={{flex: 1, width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
      )}

      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>

      <View>
        {props.useButton && (
          <Button
            onPress={e => props.buttonOnPress(e)}
            containerStyle={styles.button}
            size={props.button.size}
            color={props.button.color}>
            {props.button.text}
          </Button>
        )}
      </View>
    </View>
  );
};

Empty.defaultProps = {
  title: 'Empty',
  useButton: true,
  subtitle: 'you dont have any data in here',
  useIcon: false,
  icon: {
    name: 'inbox',
    type: 'antdesign',
    size: 80,
    color: COLORS.dark,
  },
  button: {
    size: 'sm',
    text: 'Reload',
    color: 'primary',
  },
  buttonOnPress: noop,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  button: {
    margin: 10,
  },
});

export default Empty;
