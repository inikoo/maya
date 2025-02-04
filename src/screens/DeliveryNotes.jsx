import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { AuthContext } from '@/src/components/Context/context';

const DeliveryNotes = () => {
  const { signOut, userData } = useContext(AuthContext);  

  console.log('User Data:',  useContext(AuthContext)); 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>DeliveryNotes</Text>
    </View>
  );
};

export default DeliveryNotes;
