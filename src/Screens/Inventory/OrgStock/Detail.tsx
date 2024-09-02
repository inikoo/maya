import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {Text, Divider} from '@rneui/themed';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {defaultTo} from 'lodash';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Barcode from 'react-native-barcode-builder';
import {MAINCOLORS} from '~/Utils/Colors';
import Header from '~/Components/Header';
import Layout from '~/Components/Layout';

function OrgStockDetail(props) {
  const navigation = useNavigation();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'org-stock-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        organisation.active_organisation.active_authorised_fulfilments.id,
        props.route.params.orgStock.id,
      ],
      onSuccessGetDetail,
      onFailedGetDetail,
    );
  };

  const onSuccessGetDetail = response => {
    setDataSelected(response);
    setLoading(false);
    setRefreshing(false);
  };

  const onFailedGetDetail = error => {
    setLoading(false);
    setRefreshing(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

  const renderContent = () => {
    if (!dataSelected) return null;
    return (
      <View style={styles.containerContent}>
        <View style={styles.barcodeContainer}>
          <Barcode value={`${dataSelected.slug}`} width={1} height={70} />
          <Text style={styles.barcodeText}>{`${dataSelected.slug}`}</Text>
        </View>
        <View style={styles.rowDetail}>
          <DetailRow title="Code" text={defaultTo(dataSelected.code, '-')} />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Description"
            text={defaultTo(dataSelected.description, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Number Locations"
            text={defaultTo(dataSelected.number_locations, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Quantity Locations"
            text={defaultTo(dataSelected.quantity_locations, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Unit Value"
            text={defaultTo(dataSelected.unit_value, '-')}
          />
        </View>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (!props.route.params.orgStock) navigation.goBack();
      else getDetail();
    }, [props.route.params.orgStock]),
  );

  const onRefresh = () => {
    setRefreshing(true);
    getDetail();
  };

  return (
    <Layout>
      <View style={{ flex : 1 }}>
        <Header
          title={props.route.params.orgStock.name}
          useLeftIcon
          useRightIcon
        />
        <Divider style={styles.divider} />
        {!loading ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {renderContent()}
          </ScrollView>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={MAINCOLORS.primary} />
          </View>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  containerContent: {
    flex: 1,
    padding: 15,
    marginTop: 15,
  },
  rowDetail: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 15,
  },
  barcodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  barcodeText: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  divider: {
    marginBottom: 15,
  },
});

export default OrgStockDetail;
