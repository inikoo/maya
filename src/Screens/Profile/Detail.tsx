import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {Text, Icon} from '@rneui/base';
import {UpdateCredential} from '~/Utils';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {get} from 'lodash';
import Request from '~/Utils/request';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';
import {MAINCOLORS} from '~/Utils/Colors';
import Header from '~/Components/Header';
import Layout from '~/Components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Button from '~/Components/Button';

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State to store the profile image
  const [imageError, setImageError] = useState(''); // State to store image validation error
  const user = useSelector(state => state.userReducer);
  const navigation = useNavigation();

  const validationForm = data => {
    const finalData = {};
    for (const v in data) {
      if (data[v] !== profileData[v]) finalData[v] = data[v];
    }

    // Validate that an image is selected
    if (!profileImage) {
      setImageError('Please select a profile image.');
      return; // Exit if no image is selected
    } else {
      setImageError(''); // Clear any previous error
    }

    if (Object.keys(finalData).length > 0 || profileImage) {
      onSendToServer(finalData);
    }
  };

  const onSendToServer = async data => {
    try {
      // Convert image to Blob
      const blob = await convertImageToBlob(profileImage.uri);

      // Create FormData and append the Blob
      const formData = new FormData();
      formData.append('image', {
        uri: profileImage.uri,
        type: profileImage.type,
        name: profileImage.fileName,
        blob: blob, // Include blob in formData
      });

      // Append other data
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      setLoading(true);
      await Request(
        'post',
        'update-profile',
        {['Content-Type']: 'multipart/form-data'},
        formData,
        [],
        onSuccess,
        onFailed,
      );
    } catch (error) {
      console.error('Error sending to server:', error);
      onFailed(error);
    }
  };

  const convertImageToBlob = async uri => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error converting image to blob:', error);
      throw error;
    }
  };

  const onSuccess = res => {
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'SUCCESS',
      textBody: 'Success to update',
    });

    // Navigate back to the profile screen or refresh data if needed
    // navigation.goBack();
  };

  const onFailed = res => {
    setLoading(false);
    console.error('Failed to update:', res);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Failed to update',
    });
  };

  const formik = useFormik({
    initialValues: {
      username: get(profileData, ['username'], ''),
      email: get(profileData, ['email'], ''),
      about: get(profileData, ['about'], ''),
    },
    onSubmit: validationForm,
  });

  const handleImagePickerResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.error('ImagePicker Error: ', response.errorMessage);
    } else {
      const assets = response.assets || [];
      if (assets.length > 0) {
        setProfileImage(assets[0]);
        setImageError(''); // Clear any previous error when image is selected
      }
    }
  };

  const selectImage = () => {
    Alert.alert(
      'Upload Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 500,
                maxWidth: 500,
              },
              handleImagePickerResponse,
            );
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              handleImagePickerResponse,
            );
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UpdateCredential(user.token);

        if (data.status === 'Success') {
          data.data.organisations.map(item => (item.title = item.label));
          setProfileData({...data.data});
          setProfileImage({uri: data.data.image.original});
          formik.setValues({
            username: get(data, ['data', 'username'], ''),
            email: get(data, ['data', 'email'], ''),
            about: get(data, ['data', 'about'], ''),
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <View>
        <Header
          title="Edit Profile"
          type="center"
          useLeftIcon={true}
          useRightIcon={true}
        />
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={selectImage}>
            <View style={styles.imageWrapper}>
              <Image
                source={
                  profileImage
                    ? {uri: profileImage.uri}
                    : require('../../assets/image/profile.png')
                }
                style={styles.image}
              />
              <LinearGradient
                colors={[MAINCOLORS.primary, '#ff6f00']} // Customize gradient colors
                style={styles.cameraIconContainer}>
                <Icon
                  name="camera"
                  type="font-awesome"
                  color={MAINCOLORS.white}
                  size={20}
                />
              </LinearGradient>
            </View>
          </TouchableOpacity>
          {imageError ? (
            <Text style={styles.errorText}>{imageError}</Text>
          ) : null}
        </View>

        <View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.formLabel}>Username</Text>
            <View style={[styles.inputContainer, styles.notEditable]}>
              <TextInput
                onChangeText={formik.handleChange('username')}
                value={formik.values.username}
                editable={false} // Set editable to false for username
                style={styles.textInput}
              />
              {formik.errors.username && (
                <Text style={styles.errorText}>{formik.errors.username}</Text>
              )}
            </View>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.formLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={formik.handleChange('email')}
                value={formik.values.email}
                editable={true}
                style={styles.textInput}
              />
              {formik.errors.email && (
                <Text style={styles.errorText}>{formik.errors.email}</Text>
              )}
            </View>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.formLabel}>About</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                multiline
                onChangeText={formik.handleChange('about')}
                value={formik.values.about}
                editable={true}
                numberOfLines={4}
                style={styles.textInput}
              />
              {formik.errors.about && (
                <Text style={styles.errorText}>{formik.errors.about}</Text>
              )}
            </View>
          </View>
        </View>

        {/*  <TouchableOpacity
          style={styles.saveButton}
          onPress={formik.handleSubmit}
        >
          
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity> */}
        <View style={styles.saveButton}>
          <Button
            type="primary"
            title="Save Changes"
            onPress={formik.handleSubmit}
            loading={loading}
          />
        </View>
      </View>
    </Layout>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginVertical: 22,
  },
  imageWrapper: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: MAINCOLORS.primary,
    padding: 5,
    position: 'relative',
  },
  image: {
    height: 170,
    width: 170,
    borderRadius: 100,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 14,
    backgroundColor: MAINCOLORS.primary,
    borderRadius: 15,
    padding: 5,
  },
  fieldWrapper: {
    flexDirection: 'column',
    gap: 15,
    marginVertical: 5,
    marginBottom: 8,
  },
  formLabel: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 18,
  },
  inputContainer: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(84, 76, 76, 0.14)',
    borderRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: 'white', // Default background color for editable fields
  },
  notEditable: {
    backgroundColor: 'rgba(211, 211, 211, 0.3)', // Light grey for not editable
    borderColor: 'rgba(84, 76, 76, 0.3)', // Darker border for not editable
  },
  textInput: {
    color: 'black', // Ensure text color is black for both editable and non-editable
  },
  textAreaContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(84, 76, 76, 0.14)',
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 5, // Added margin for better spacing
  },
  saveButton: {
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: MAINCOLORS.primary,
    marginTop: 20,
  },
  saveButtonText: {
    color: MAINCOLORS.white,
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
  },
});
