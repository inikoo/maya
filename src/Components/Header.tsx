import React, { ReactNode } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

// Define props type
type Props = {
  useLeftIcon?: boolean;
  useRightIcon?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title: ReactNode;
  type: 'start' | 'center'; // Specify exact string literals
};

// Left Icon Component
export const LeftIcon = () => {
  const navigation = useNavigation(); // Get the navigation object
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      accessible={true}
      accessibilityLabel="Go back"
      style={{ marginRight : 15}}
    >
      <Icon name="left" type="antdesign" size={25} />
    </TouchableOpacity>
  );
};

// Header Component
export function Header( props : Props) {
  return (
    <View style={styles.headerContainer}>
      {props.useLeftIcon && (
        <View>
          {props.leftIcon}
        </View>
      )}
      <Text
        style={[
          styles.title,
          props.type === 'center' && styles.typeCenterTitle
        ]}
      >
        {props.title}
      </Text>
      {props.useRightIcon && (
        <View style={styles.iconContainer}>
          {props.rightIcon}
        </View>
      )}
    </View>
  );
}

 
Header.defaultProps = {
  useLeftIcon : false,
  useRightIcon : true,
  leftIcon : <LeftIcon />,
  rightIcon : <View />,
  title : '',
  type : 'start',
};

// Styles
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    flex: 1, 
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  typeCenterTitle : {
    textAlign : 'center',
    marginHorizontal : 'auto',
    paddingHorizontal : 'auto'
  }
});

export default Header;
