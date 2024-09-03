import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {ReactNode} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

type Item = {
  name: string;
  component: ReactNode;
  options: {
    tabBarButton: ReactNode;
  };
};

type Props = {
  route: {
    params: string;
  };
  extraData: {
    components: Array<any>;
  };
};

function CustomTabBar({state, descriptors, navigation}) {
  return (
    <View style={{...styles.tabBarContainer}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
            >
              <View style={styles.tabButtonContainer}>
                <FontAwesomeIcon
                  icon={options.tabBarIcon}
                  color={isFocused ? MAINCOLORS.primary : ''}
                  size={26}
                />
                <Text style={[styles.tabLabel, {color: isFocused ? MAINCOLORS.primary : 'black'}]}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

function BottomMenu(props: Props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      tabBar={tabBarProps => <CustomTabBar {...tabBarProps} />}
    >
      {props.extraData.components.map((item: Item, index: number) => (
        <Tab.Screen
          {...item}
          key={item.name}
          name={item.name}
          component={item.component}
          options={item.options}
          initialParams={{...props.route.params}}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    paddingHorizontal: 0,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  tabContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 0,
  },
  tabButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 3,
  },
  tabLabel: {
    fontSize: 12,
  }
});

export default BottomMenu;
