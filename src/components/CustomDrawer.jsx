import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {AuthContext} from '@/src/components/Context/context';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@/private/fa/pro-regular-svg-icons';

const CustomDrawer = props => {
  const {signOut, userData} = useContext(AuthContext);

  return (
    <View className="flex-1">
      <DrawerContentScrollView
        {...props}
        contentContainerClassName="p-0 bg-[#6366F1]">
        <View className="p-5 bg-indigo-500">
          <TouchableOpacity
            onPress={() => props.navigation.navigate('setting')}>
            <Image
              source={
                userData?.image?.original
                  ? {uri: userData.image.original}
                  : require('@/asssets/Image/user-profile.jpg')
              }
              className="w-20 h-20 rounded-full mb-2"
            />
          </TouchableOpacity>
          <Text className="text-white text-lg font-medium mb-1">
            {userData?.username || 'Guest User'}
          </Text>
        </View>

        <View className="bg-white pt-2">
          <DrawerItemList {...props} contentContainerStyle={{padding: 0}} />
        </View>
      </DrawerContentScrollView>

      <View className="p-5 border-t border-gray-300">
        <TouchableOpacity
          onPress={signOut}
          className="py-3 flex-row items-center">
          <FontAwesomeIcon icon={faSignOutAlt} size={22} />
          <Text className="text-base font-medium ml-2">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
