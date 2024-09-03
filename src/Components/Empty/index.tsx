import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Icon, Button} from '@rneui/themed';
import {COLORS} from '~/Utils/Colors';
import {noop} from 'lodash';

type Props = {
  title: String,
  useButton: Boolean,
  subtitle: String,
  imageurl?: any, // Updated to allow any type (local or remote)
  icon: {
    name: string,
    type: String,
    size: Number,
    color: String,
  },
  useImage: Boolean,
  button: {
    size: Number,
    text: String,
    color: String,
  },
  buttonOnPress: () => void,
}

const Empty = (props: Props) => {
  const renderImage = () => {
    if (!props.useImage) {
      return (
        <Icon
          name={props.icon.name}
          type={props.icon.type}
          size={props.icon.size}
          color={props.icon.color}
        />
      );
    }

    const imageSource = typeof props.imageurl === 'string'
      ? {uri: props.imageurl} // If it's a URI
      : props.imageurl; // If it's a local image path

    return (
      <View style={{height: 300, width: 300}}>
        <Image
          source={imageSource}
          style={{flex: 1, width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderImage()}

      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>

      <View>
        {props.useButton && (
          <Button
            onPress={props.buttonOnPress}
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
  useImage: true,
  subtitle: 'You don\'t have any data here',
  imageurl: require('../../assets/image/9264822.jpg'), // Use require for static image paths
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
