import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';

type Item = {
  name: String;
  component: ReactNode;
  options: {
    tabBarButton : ReactNode
  };
};

type props = {
  route: {
    params: string;
  };
  extraData: {
    components: Array;
  };
};


function BottomMenu(porps: props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {...style.tab, ...style.shadow},
      }}>
      {porps.extraData.components.map((item: Item, index: Number) => (
        <Tab.Screen
          {...item}
          key={item.name}
          name={item.name}
          component={item.component}
          options={item.options}
          initialParams={{...porps.route.params}}
        />
      ))}
    </Tab.Navigator>
  );
}

const style = StyleSheet.create({
  tab: {
    position: 'absolute',
    bottom: 18,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    height: 60,
    borderWidth: 0,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
});

export default BottomMenu;
