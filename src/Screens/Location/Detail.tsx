import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, ActivityIndicator} from 'react-native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Text, SpeedDial} from '@rneui/themed';
import {get, defaultTo, isNull} from 'lodash';
import dayjs from 'dayjs';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const Detail = props => {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false); // Corrected from React.useState to useState

  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'locations-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        props.route.params.location.id,
      ],
      onSuccessGetDetail,
      onFailedGetDetail,
    );
  };

  const onSuccessGetDetail = response => {
    console.log(response);
    setDataSelected(response);
    setLoading(false);
  };

  const onFailedGetDetail = error => {
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

  useEffect(() => {
    getDetail();
  }, []);

  return !loading ? (
    <View style={styles.container}>
      <Image
        source={require('../../assets/image/location.jpg')}
        style={styles.img}
        resizeMode="cover"
      />
      <View style={styles.cont3}>
        <Text style={styles.title}>{get(dataSelected, 'code', '-')}</Text>
        <View style={styles.descriptionContainer}>
          <DetailRow
            title="Status :"
            text={defaultTo(dataSelected.status, '-')}
          />
          <DetailRow
            title="Created At :"
            text={dayjs(dataSelected.created_at).format('DD/MM/YY')}
          />
       {/*    <DetailRow
            title="Updated At :"
            text={dayjs(dataSelected.updated_at).format('DD/MM/YY')}
          /> */}
          <DetailRow
            title="Audited At :"
            text={
              dataSelected.audited_at && !isNull(dataSelected.audited_at)
                ? dayjs(dataSelected.audited_at).format('DD/MM/YY')
                : '-'
            }
          />
          <DetailRow title="Stock Value :" text={dataSelected.stock_value} />
          <DetailRow
            title="Max Volume :"
            text={defaultTo(dataSelected.max_volume, '-')}
          />
          <DetailRow
            title="Max Weight :"
            text={defaultTo(dataSelected.max_weight, '-')}
          />
        </View>
      </View>
      <SpeedDial
        isOpen={open}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        style={styles.speedDial} // Added style prop
        direction="down"
        onPress={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{ name: 'pallet' }}
          title="Pallet"
          onPress={() =>
            navigation.navigate('Location Pallet', {location: dataSelected})
          }
        />
      </SpeedDial>
    </View>
  ) : (
    <ActivityIndicator size="large" />
  );
};

export default Detail;

const DetailRow = ({title, text, renderContent}) => (
  <View style={styles.descriptionRow}>
    <Text style={styles.descriptionTitle}>{title}</Text>
    {!renderContent ? (
      <Text style={styles.descriptionText}>{text}</Text>
    ) : (
      renderContent
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Montserrat_700Bold',
    marginTop: 30,
    fontWeight: 'bold',
    color:MAINCOLORS.primary
  },
  img: {
    height: '60%',
    width: '100%',
  },
  cont3: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    marginTop: -50,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  descriptionText: {
    flex: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
