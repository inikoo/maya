import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { AuthContext } from '@/src/components/Context/context';

const Home = () => {
  const { signOut, userData } = useContext(AuthContext);  

  console.log('User Data:', userData); 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Home</Text>
      {/* {userData ? (
        <>
          <Text style={{ marginTop: 10 }}>Welcome, {userData.username}!</Text>
          <Text>Your Email: {userData.email}</Text>
          <Text>Your Role: {userData.role}</Text>
          <Text>Your ID: {userData.id}</Text>
        </>
      ) : (
        <Text>Loading user data...</Text>
      )} */}

      {/* Logout Button */}
      <Button title="Logout" onPress={signOut} color="red" />
    </View>
  );
};

export default Home;
