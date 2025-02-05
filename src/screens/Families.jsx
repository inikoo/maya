import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { AuthContext } from '@/src/components/Context/context';

const Families = () => {
  const { signOut, userData } = useContext(AuthContext);  


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Families</Text>
    </View>
  );
};

export default Families;
