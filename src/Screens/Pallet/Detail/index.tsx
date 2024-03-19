// Import necessary components
import React, {useState, useEffect} from 'react';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Text, Card, Button, Icon, Overlay} from '@rneui/themed';
import {get, defaultTo} from 'lodash';
import PalletImg from '../../../assets/image/pallet.jpg';
import Description from './Description';
import Movement from './MovementPallet';
import {useFormik} from 'formik';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

function Scanner(props) {
  // State variables
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const [pageMovement, setPageMovement] = useState(false);

  const MoveToNewLocation = async (data: object) => {
    await Request(
      'patch',
      'pallete-location',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        data.location.id,
        dataSelected.id,
      ],
     onMoveSuccess,
     onMoveFailed,
    );
  };

  const onMoveSuccess = (response)=>{
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet already move to new Location',
    })
    setPageMovement(false)
    getDetail();
  }

  const onMoveFailed = (response)=>{
    console.error(response)
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Success',
      textBody: response.response.data.message,
    })
  }

  const formik = useFormik({
    initialValues: {
      location: null,
    },
    onSubmit: MoveToNewLocation,
  });

  // Function to fetch details
  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'pallate-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        organisation.active_organisation.active_authorised_fulfilments.slug,
        props.route.params.pallete.id,
      ],
      onSuccessGetDetail,
      onFailedGetDetail,
    );
  };

  // Success callback for detail fetch
  const onSuccessGetDetail = response => {
   
    setDataSelected(response.data);
    setLoading(false);
    formik.setFieldValue('location',{...response.data.location ,title :response.data.location.code, id: response.data.location.slug })
  };

  // Error callback for detail fetch
  const onFailedGetDetail = error => {
    console.error('show', error);
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    })
  };

  // Function to toggle overlay visibility
  const toggleChangeContent = () => {
    setPageMovement(!pageMovement);
  };



 

  // Effect hook to fetch details on component mount
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {!loading ? (
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title>{get(dataSelected, 'reference', '-')}</Card.Title>
            <Card.Divider />
            <Image source={PalletImg} style={styles.locationImage} />
            {!pageMovement ? (
              <View style={styles.descriptionContainer}>
                <Description data={dataSelected} />
                <Button
                  icon={
                    <Icon
                      name="location-pin"
                      color="#ffffff"
                      iconStyle={styles.buttonIcon}
                    />
                  }
                  onPress={toggleChangeContent}
                  buttonStyle={styles.button}
                  title="Move Location "
                />
              </View>
            ) : (
              <View>
                <Movement
                  onChange={formik.handleChange('location')}
                  value={formik.values.location}
                  form={formik}
                />
                {formik.errors.location && (
                  <Text style={{color: 'red'}}>{formik.errors.location}</Text>
                )}
                 <Button
                  icon={
                    <Icon
                      name="location-pin"
                      color="#ffffff"
                      iconStyle={styles.buttonIcon}
                    />
                  }
                  onPress={formik.handleSubmit}
                  buttonStyle={styles.button}
                  title="Send to location "
                />
              </View>
            )}
          </Card>
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '90%',
    borderRadius: 10,
    marginBottom: 20,
  },
  locationImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default Scanner;
