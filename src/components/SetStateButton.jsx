import React from 'react';
import {View} from 'react-native';
import {Card} from '@/src/components/ui/card';
import {Button, ButtonText} from '@/src/components/ui/button';

const SetStateButton = ({
  button1 = {
    size: 'md',
    variant: 'outline',
    action: 'primary',
    style: {borderTopRightRadius: 0, borderBottomRightRadius: 0},
    onPress: null,
    text: 'Button 1',
  },
  button2 = {
    size: 'md',
    variant: 'outline',
    action: 'primary',
    style: {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},
    onPress: null,
    text: 'Button 2',
  },
}) => {
  return (
    <Card className="p-4 border border-gray-300 rounded-lg shadow-md">
      <View className="flex-row items-center justify-between">
        {/* To Do Button */}
        <Button {...button1} className="w-1/2">
          <ButtonText>{button1.text}</ButtonText>
        </Button>

        {/* State Button */}
        <Button {...button2} className="w-1/2">
          <ButtonText>{button2.text}</ButtonText>
        </Button>
      </View>
    </Card>
  );
};

export default SetStateButton;
