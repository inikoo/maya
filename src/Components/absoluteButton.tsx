import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@rneui/themed';
import { MAINCOLORS } from '~/Utils/Colors';
import { ActivityIndicator } from 'react-native';

type Props = {
  content: ReactNode;
  position: {
    bottom: number;
    left: number;
  };
  containerStyle: {
    backgroundColor: string;
    height: number;
    width: number;
    borderRadius: number;
  };
  loading: boolean;
  onPress: () => void;
};

const AbsoluteButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={[styles.absoluteButton, props.position, props.containerStyle]}
      onPress={props.onPress}
    >
      <View style={styles.contentContainer}>
        {props.loading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          props.content
        )}
      </View>
    </TouchableOpacity>
  );
};

AbsoluteButton.defaultProps = {
  onPress: () => null,
  position: {
    bottom: 20,
    right: 10,
  },
  loading: false,
  containerStyle: {
    backgroundColor: MAINCOLORS.primary,
    height: 80,
    width: 80,
    borderRadius: 40, // Half of height and width to ensure a perfect circle
  },
  content: <Text>Button</Text>,
};

const styles = StyleSheet.create({
  absoluteButton: {
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default AbsoluteButton;
