import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFormik} from 'formik';
import Warehouse from '../../assets/image/warehouse.jpeg';
import {UpdateCredential} from '~/Utils/auth';
import {useSelector, useDispatch} from 'react-redux';
import {get} from 'lodash';
import Request from '~/Utils/request';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '~/Utils/Colors';

const EditProfile = props => {
  const [profileData, setProfileData] = useState(null);
  const user = useSelector(state => state.userReducer);
  const navigation = useNavigation();

  const validationForm = data => {
    const finalData = {};
    for (const v in data) {
      if (data[v] !== profileData[v]) finalData[v] = data[v];
    }
    if (Object.keys(finalData).length > 0) onSendToServer(finalData);
  };

  const onSendToServer = async data => {
    await Request(
      'post',
      'profile',
      {['Content-Type']: 'multipart/form-data'},
      data,
      [],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = res => {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'SUCCESS',
      textBody: 'Success to update',
    });
  };

  const onFailed = res => {
    console.log(res);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Failed to update',
    });
  };


  const formik = useFormik({
    initialValues: {
      email: get(profileData, ['email']),
      about: get(profileData, ['about']),
    },
    onSubmit: validationForm,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UpdateCredential(user.token);
        if (data.status === 'Success') {
          data.data.organisations.map(item => (item.title = item.label));
          setProfileData({...data.data});
          formik.setValues({
            email: get(data, ['data', 'email']),
            about: get(data, ['data', 'about']),
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 22,
        marginBottom: 40,
      }}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 22,
          }}>
          <TouchableOpacity>
            <Image
              source={Warehouse}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{marginBottom: 6}}>
            <Text>Email</Text>
            <View
              style={{
                height: 44,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}>
              <TextInput
                onChangeText={formik.handleChange('email')}
                value={formik.values.email}
                editable={true}
              />
              {formik.errors.email && (
                <Text style={{color: 'red'}}>{formik.errors.email}</Text>
              )}
            </View>
          </View>

          <View style={{marginBottom: 6}}>
            <Text>About</Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                paddingLeft: 8,
              }}>
              <TextInput
                multiline
                onChangeText={formik.handleChange('note')}
                value={formik.values.note}
                editable={true}
                numberOfLines={4}
              />
              {formik.errors.note && (
                <Text style={{color: 'red'}}>{formik.errors.note}</Text>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            height: 44,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary, // Add some style
            marginTop: 20, // Add some space between text input and button
          }}
          onPress={formik.handleSubmit}>
          <Text style={{color: 'white'}}>Save Change</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 44,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'black',
            backgroundColor: 'white', // Add some style
            marginTop: 20, // Add some space between text input and button
          }}
          onPress={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
