import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as Animatable from 'react-native-animatable';


const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      className="flex-1 items-center justify-center"
      style={styles.container}>
      <View>
        <Animatable.View
          ref={viewRef}
          className="absolute inset-0 rounded-lg"
          style={{backgroundColor: item.color}}
        />
        <View
          style={[styles.btn]}
          className={`flex-row gap-2 items-center p-2 rounded-lg ${
            focused ? 'bg-indigo-500' : ''
          }`}>
          <FontAwesomeIcon
            icon={item.icon}
            size={22}
            color={focused ? '#fff' : '#000'}
          />
          <Animatable.View ref={textViewRef}>
            {focused && <Text className="text-white px-2">{item.label}</Text>}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function AnimTab(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            margin: 16,
            borderRadius: 16,
          },
        }}>
        {props.tabArr.map((item, index) => {
          console.log('sss',item)
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: props => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
});
