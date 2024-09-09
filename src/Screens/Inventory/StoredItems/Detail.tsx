import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {findColorFromAiku, Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {Text, Divider, Icon, BottomSheet, ListItem} from '@rneui/themed';
import {useFocusEffect} from '@react-navigation/native';
import {defaultTo} from 'lodash';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Barcode from 'react-native-barcode-builder';
import {useNavigation} from '@react-navigation/native';
import {MAINCOLORS} from '~/Utils/Colors';
import Header from '~/Components/Header';
import Layout from '~/Components/Layout';
import {reduxData} from '~/Types/types';
import {Data, Datum} from '~/Types/StoredItemTypes';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faInventory,
  faTruckCouch,
  faPallet,
  faSignOut,
  faBox,
  faTimes,
  faBetamax,
  faUndoAlt,
  faShare,
  faSpellCheck,
  faGhost,
} from 'assets/fa/pro-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

library.add(
  faInventory,
  faTruckCouch,
  faPallet,
  faSignOut,
  faBox,
  faTimes,
  faBetamax,
  faUndoAlt,
  faSpellCheck,
  faShare,
  faGhost,
);

type Props = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      item: Datum;
    };
    path: string;
  };
};

function PalletDetail(props: Props) {
  const navigation = useNavigation();
  const organisation = useSelector(
    (state: reduxData) => state.organisationReducer,
  );
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);

  const buttonFeatures = [
    {
      icon: {
        name: 'location-pin',
        type: 'material-icons',
      },
      key: 'move_location',
      title: 'Move Location',
      onPress: () => {},
    },
  ];

  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'stored-item-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        organisation.active_organisation.active_authorised_fulfilments.id,
        props.route.params.item.id,
      ],
      onSuccessGetDetail,
      onFailedGetDetail,
    );
  };

  const onSuccessGetDetail = (response: any) => {
    setDataSelected(response.data);
    setLoading(false);
    setRefreshing(false);
  };

  const onFailedGetDetail = (error: any) => {
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
          <DetailRow
            title="Reference"
            text={defaultTo(dataSelected.reference, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Customer name"
            text={defaultTo(dataSelected.customer_name, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Location"
            text={defaultTo(dataSelected.location, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Total quantity"
            text={defaultTo(dataSelected.total_quantity, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Max quantity"
            text={defaultTo(dataSelected.max_quantity, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="state"
            text={
              <View
                style={{
                  width: 130,
                  borderRadius: 20,
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  gap: 4,
                  backgroundColor: findColorFromAiku(
                    dataSelected.state_icon.color,
                  ),
                }}>
                <FontAwesomeIcon
                  icon={dataSelected.state_icon.icon}
                  color="white"
                />
                <Text style={{color: 'white'}}>
                  {dataSelected.state_icon.tooltip}
                </Text>
              </View>
            }
          />
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    getDetail();
  };

  useFocusEffect(
    useCallback(() => {
      if (!props.route.params.item) navigation.goBack();
      else getDetail();
    }, [props.route.params.item]),
  );

  return (
    <Layout>
      <View style={{flex: 1}}>
        <Header
          title={props.route.params.item.reference}
          useLeftIcon
          useRightIcon
          rightIcon={
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Icon name="menu" type="entypo" />
            </TouchableOpacity>
          }
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
        <BottomSheet modalProps={{}} isVisible={open}>
          <View style={styles.wrapper}>
            <Header
              title="Setting"
              rightIcon={
                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  style={{marginRight: 20}}>
                  <Icon
                    color={MAINCOLORS.danger}
                    name="closecircle"
                    type="antdesign"
                    size={20}
                  />
                </TouchableOpacity>
              }
            />
            <Divider />
            <View style={{marginVertical: 15, backgroundColor: 'white'}}>
              {buttonFeatures.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={{...l.containerStyle}}
                  onPress={l.onPress}>
                  <Icon {...l.icon} size={18} />
                  <ListItem.Content>
                    <ListItem.Title>{l.title}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          </View>
        </BottomSheet>
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
  wrapper: {
    backgroundColor: '#ffffff',
    padding: 15,
  },
});

export default PalletDetail;
