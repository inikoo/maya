import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, View, ImageBackground } from 'react-native';
import {
  Input,
  InputField,
  InputSlot,
  InputIcon,
} from '@/src/components/ui/input';
import { Box } from '@/src/components/ui/box';
import { VStack } from '@/src/components/ui/vstack';
import { Button, ButtonText } from '@/src/components/ui/button';
import { EyeIcon, EyeOffIcon } from '@/src/components/ui/icon';
import SvgUri from 'react-native-svg-uri';
import request from '@/src/utils/Request';
import { retrieveProfile } from '@/src/user';
import { AuthContext } from '@/src/components/Context/context';

const LoginScreen = () => {
  const { signIn } = useContext(AuthContext); // ✅ useContext harus di dalam komponen
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    return new Promise((resolve) => {
      request({
        method: 'post',
        urlKey: 'login',
        autoRefreshExpiredToken: false,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: {
          username: email,
          password: password,
          device_name: 'android',
        },
        onBoth: async (isSuccess, userRes) => {
          if (isSuccess) {
            await retrieveProfile({
              accessToken: userRes.token,
              onSuccess: async (profileRes) => {
                const user = { ...userRes, ...profileRes.data };
                  signIn(user);
                  resolve(true);
              },
              onFailed: (err) => {
                console.error('Profile Retrieval Failed:', err);
              },
            });
          } else {
            console.error('Login Failed:', userRes);
            resolve(false);
          }
        },
      });
    });
  };

  return (
    <ImageBackground
      source={require('@/asssets/Image/background-guest.webp')} 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Box className="w-80 p-6 bg-white border border-gray-300 rounded-2xl shadow-md">
        <VStack className="space-y-5">
          <View className="pb-4">
            <Text className="text-gray-600 py-1">Username</Text>
            <Input variant="outline" size="md">
              <InputField
                placeholder="Johndoe"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Input>
          </View>

          <View className="pt-0 pb-4">
            <Text className="text-gray-600 py-1">Password</Text>
            <Input variant="outline" size="md">
              <InputField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword} // ✅ Gunakan secureTextEntry
              />
              <InputSlot className="pr-3" onPress={handleShowPassword}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </View>

          <Button
            size="lg"
            variant="solid"
            action="primary"
            className="rounded-lg"
            onPress={handleLogin}>
            <ButtonText className="text-white text-lg font-semibold">
              Login
            </ButtonText>
          </Button>
        </VStack>
      </Box>

      {/* SVG Logo and Text in the bottom-left corner */}
      <View className="absolute bottom-5 left-5 flex-row items-center gap-3">
        <SvgUri
          width="40"
          height="40"
          source={require('@/asssets/Logo/logo-yellow.svg')} // ✅ Path diperbaiki
        />
        <Text
          style={{
            fontSize: 40,
            fontFamily: 'Fira, sans-serif',
            color: 'white',
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Aiku
        </Text>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
