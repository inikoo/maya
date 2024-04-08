import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Request} from '~/Utils';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {Avatar, Text, Chip} from '@rneui/themed';
import {defaultTo, get} from 'lodash';
import BaseList from '~/Components/BaseList';
import {useNavigation} from '@react-navigation/native';
import DetailRow from '~/Components/DetailRow';
import PalletCard from '~/Components/palletComponents/ListCard';

const DeliveryDetail = props => {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const navigation = useNavigation();

  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'delivery-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        props.route.params.delivery.id,
      ],
      onSuccessGetDetail,
      onFailedGetDetail,
    );
  };

  const onSuccessGetDetail = response => {
    setDataSelected(response.data);
    setLoading(false);
  };

  const onFailedGetDetail = error => {
    setLoading(false);
  };

  const headerCard = () => {
    return (
      <View
        style={{
          backgroundColor: MAINCOLORS.warning,
          padding: 20,
          borderRadius: 10,
        }}>
        <View style={styles.header}>
          <Avatar
            size={35}
            icon={{
              name: 'truck',
              type: 'font-awesome',
              color: MAINCOLORS.white,
            }}
            containerStyle={styles.avatarContainer}
          />
          <Text style={styles.reference}>{dataSelected.reference}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <DetailRow
            title="Customer Name"
            text={defaultTo(dataSelected.customer_name, '-')}
          />
          <DetailRow
            title="State"
            text={() => {
              return (
                <Chip
                  title={dataSelected.state}
                  color={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                  buttonStyle={{padding: 1, marginHorizontal: 2}}
                  titleStyle={{fontSize: 12}}
                />
              );
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <DetailRow
            title="Total Pallet"
            text={defaultTo(dataSelected.number_pallets, 0)}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={MAINCOLORS.primary} />
      ) : (
        <View style={styles.contentContainer}>
          {headerCard()}
          <ScrollView>
            <BaseList
              urlKey="delivery-pallet-index"
              args={[
                organisation.active_organisation.id,
                warehouse.id,
                props.route.params.delivery.id,
              ]}
              renderItem={data => <PalletCard data={data.item} />}
              navigation={props.navigation}
              title="Delivery"
              scanner={false}
              settingButton={false}
              showRecords={false}
            />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINCOLORS.background,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatarContainer: {
    backgroundColor: MAINCOLORS.primary,
    marginRight: 13,
    marginLeft: 5,
  },
  reference: {
    fontWeight: '500',
    fontSize: 20,
  },
  detailsContainer: {
    marginLeft: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 6,
  },
});

export default DeliveryDetail;
