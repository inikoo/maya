import React, { ReactNode } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

// Define props type
type Props = {
  useLeftIcon?: boolean; // Optional boolean
  useRightIcon?: boolean; // Optional boolean
  leftIcon?: ReactNode; // Optional ReactNode for the left icon
  rightIcon?: ReactNode; // Optional ReactNode for the right icon
  title: ReactNode; // Title is required, can be a string or a ReactNode
};

// Left Icon Component
export const LeftIcon = () => {
    const navigation = useNavigation(); // Get the navigation object
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}> 
        <Icon name="left" type="antdesign" size={18} />
      </TouchableOpacity>
    );
  };

// Header Component
export function Header(props: Props) {
  return (
    <View style={styles.headerContainer}>
      {props.useLeftIcon && props.leftIcon}
      <Text style={styles.title}>{props.title}</Text>
      {props.useRightIcon && props.rightIcon}
    </View>
  );
}

// Default Props
Header.defaultProps = {
  useLeftIcon: false,
  useRightIcon: false,
  leftIcon: <LeftIcon />, // Assign the default LeftIcon component
  rightIcon: <View />, // Default rightIcon as an empty View
};

// Styles
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Space items evenly between
    paddingVertical: 10,
    gap : 25,
    backgroundColor: '#fff', // Add a background color for the header
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    flex: 1, // Allow the title to take up available space
  },
});

export default Header;
