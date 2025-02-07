import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/ui/text';

const Description = ({ schema }) => {
  return (
    <View className="border border-gray-300 rounded-lg p-2 mt-2">
      {schema.map((item, index) => (
        <View
          key={index}
          className={`flex-row justify-between  ${
            index !== schema.length - 1 ? 'border-b border-gray-200 pb-2 p-2' : 'px-2 p-2'
          }`}
        >
          <View className="bg-gray-200 px-2 py-1 rounded">
            {typeof item.label === 'string' ? (
              <Text className="font-semibold">{item.label}</Text>
            ) : (
              item.label
            )}
          </View>
          <View>
            {typeof item.value === 'string' ? (
              <Text>{item.value}</Text>
            ) : (
              item.value
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Description;
