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
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {get} from 'lodash';
import Request from '~/Utils/request';
import {RemoveCredential} from '~/Utils/auth';
import Action from '~/Store/Action';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const EditProfile = props => {
  const oraganisation = useSelector(state => state.organisationReducer);
  const [selectedItem, setSelectedItem] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const onSendToServer = async data => {
    console.log(data)
    await Request(
      'post',
      'profile',
      { ['Content-Type']: "multipart/form-data"},
      {email : data.email, about : data.about },
      [],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = res => {
    console.log(res)
    const data = formik.data();
    dispatch(
      Action.CreateUserOrganisationProperties({
        ...oraganisation,
        active_organisation: {
          ...data,
          active_authorised_fulfilments: data.authorised_fulfilments[0],
        },
      }),
    );
  };

  const onFailed = res => {
    console.log(res)
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Failed to update',
    });
  };

  const logOut = () => {
    RemoveCredential();
    dispatch(Action.DestroyUserSessionProperties());
  };

  const formik = useFormik({
    initialValues: {
      email: get(profileData, ['email']),
      about: get(profileData, ['about']),
      organisation: get(oraganisation, ['active_organisation']),
    },
    onSubmit: onSendToServer,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UpdateCredential(user.token);
        if (data.status === 'Success') {
          data.data.organisations.map(item => (item.title = item.label));
          setProfileData({...data.data});
          setSelectedItem(oraganisation.active_organisation);
          // Set initial field values using setValues instead of setFieldValue
          formik.setValues({
            email: get(data, ['data','email']),
            about: get(data, ['data','about']),
          });
        }
        console.log('aaa', data,user)
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
          <View style={{marginBottom: 6}}>
            <Text>Organisation</Text>
            <View
              style={{
                height: 44,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}>
              <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                initialValue={get(oraganisation, ['active_organisation'])}
                onSelectItem={item =>
                  formik.setFieldValue('organisation', item)
                }
                dataSet={get(profileData, ['organisations'], [])}
              />
            </View>
          </View>
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
            backgroundColor: 'blue', // Add some style
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
          onPress={logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
