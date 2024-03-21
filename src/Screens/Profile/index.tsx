import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const EditProfile = ({navigation}) => {
  const [name, setName] = useState('Melissa Peters');
  const [email, setEmail] = useState('metperters@gmail.com');
  const [password, setPassword] = useState('randompassword');
  const [country, setCountry] = useState('Nigeria');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 22,
      }}>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 0,
          }}></TouchableOpacity>

        <Text>Edit Profile</Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 22,
          }}>
          <TouchableOpacity>
            {/*  <Image
                source={{ uri: selectedImage }}
                style={{
                  height: 170,
                  width: 170,
                  borderRadius: 85,
                  borderWidth: 2,
                }}
              /> */}

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}></View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}>
            <Text>Name</Text>
            <View
              style={{
                height: 44,
                width: '100%',
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}>
              <TextInput
                value={name}
                onChangeText={value => setName(value)}
                editable={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}>
            <Text>Email</Text>
            <View
              style={{
                height: 44,
                width: '100%',
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}>
              <TextInput
                value={email}
                onChangeText={value => setEmail(value)}
                editable={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}>
            <Text>Password</Text>
            <View
              style={{
                height: 44,
                width: '100%',

                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}>
              <TextInput
                value={password}
                onChangeText={value => setPassword(value)}
                editable={true}
                secureTextEntry
              />
            </View>
          </View>
        </View>


        <TouchableOpacity
          style={{
            height: 44,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Save Change</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
