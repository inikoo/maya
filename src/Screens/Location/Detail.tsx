import React, { useState, useEffect } from 'react';
import { Request } from '~/Utils';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { get, defaultTo, isNull } from "lodash"
import dayjs from 'dayjs';
import Location from '../../assets/image/location.jpg';
import { COLORS } from '~/Utils/Colors';

function Scanner(props) {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const navigation = useNavigation();

  console.log('props',props)

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
        props.route.params.location.slug,
      ],
      onSuccessGetDetail,
      onFailedGetDetail
    );
  };

  const onSuccessGetDetail = response => {
    setDataSelected(response);
    setLoading(false);
  };

  const onFailedGetDetail = error => {
    setLoading(false);
    console.log('show', error);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {!loading ? (
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <Card.Title>{get(dataSelected, 'code', '-')}</Card.Title>
            <Card.Divider />
            <Image source={Location} style={styles.locationImage} />
            <View style={styles.descriptionContainer}>
              <DetailRow title="Status" text={defaultTo(dataSelected.status, '-')} />
              <DetailRow title="Created At" text={dayjs(dataSelected.created_at).format('DD/MM/YY')} />
              <DetailRow title="Updated At" text={dayjs(dataSelected.updated_at).format('DD/MM/YY')} />
              <DetailRow title="Audited At" text={dataSelected.audited_at && !isNull(dataSelected.audited_at)
                      ? dayjs(dataSelected.audited_at).format('DD/MM/YY')
                      : '-'} />
              <DetailRow title="Stock Value" text={dataSelected.stock_value} />
              <DetailRow title="Max Volume" text={defaultTo(dataSelected.max_volume, '-')} />
              <DetailRow title="Max Weight" text={defaultTo(dataSelected.max_weight, '-')} />
            </View>
            <Button
              icon={<Icon name="pallet" color="#ffffff" iconStyle={styles.buttonIcon} />}
              buttonStyle={styles.button}
              onPress={()=>navigation.navigate('Location Pallet',{location: dataSelected})}
              title="Pallet List"
            />
          </Card>
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </ScrollView>
  );
}

const DetailRow = ({ title, text }) => (
  <View style={styles.descriptionRow}>
    <Text style={styles.descriptionTitle}>{title}</Text>
    <Text style={styles.descriptionText}>{text}</Text>
  </View>
);

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
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  descriptionText: {
    flex: 1,
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    backgroundColor : COLORS.primary
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default Scanner;
