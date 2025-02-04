import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { AuthContext } from '@/src/components/Context/context';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@/private/fa/pro-regular-svg-icons';

const CustomDrawer = (props) => {
  const { signOut, userData } = useContext(AuthContext);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => setImageError(true);

  // Ambil inisial dari username
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props} contentContainerClassName="p-0 bg-[#6366F1]">
        <View className="p-5 bg-indigo-500 flex items-center">
          <TouchableOpacity onPress={() => props.navigation.navigate('setting')}>
            {!imageError && userData?.image?.original ? (
              <Image
                source={{ uri: userData.image.original }}
                className="w-20 h-20 rounded-full mb-2"
                onError={handleImageError}
              />
            ) : (
              <View className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-2 bg-white">
                <Text className="text-xl font-bold text-gray-700">
                  {getInitials(userData?.username)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <Text className="text-white text-lg font-medium mb-1">
            {userData?.username || 'Guest User'}
          </Text>
        </View>

        <View className="bg-white pt-2">
          <DrawerItemList {...props} contentContainerStyle={{ padding: 0 }} />
        </View>
      </DrawerContentScrollView>

      <View className="p-5 border-t border-gray-300">
        <TouchableOpacity onPress={signOut} className="py-3 flex-row items-center">
          <FontAwesomeIcon icon={faSignOutAlt} size={22} />
          <Text className="text-base font-medium ml-2">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
