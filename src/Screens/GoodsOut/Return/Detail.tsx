import React, {useState, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Request, IconColor} from '~/Utils';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Text, BottomSheet, Icon, Divider, ListItem} from '@rneui/themed';
import {defaultTo, isNull} from 'lodash';
import dayjs from 'dayjs';
import {MAINCOLORS} from '~/Utils/Colors';
import {findColorFromAiku} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Barcode from 'react-native-barcode-builder';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import AbsoluteButton from '~/Components/absoluteButton';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSeedling,
  faShare,
  faCheck,
  faTimes,
  faCheckDouble,
  faSpellCheck,
  faPallet,
  faNarwhal,
  faTruck,
} from 'assets/fa/pro-light-svg-icons';

library.add(
  faSeedling,
  faShare,
  faSpellCheck,
  faCheck,
  faTimes,
  faCheckDouble,
  faTruck,
  faPallet,
  faNarwhal,
);

const RetrunDetail = props => {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [loadingPrimary, setLoadingPrimary] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'return-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        props.route.params.return.id,
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
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to get data',
    });
  };

  const changeStatus = ({url = ''}) => {
    setLoadingPrimary(true);
    Request(
      'patch',
      url,
      {},
      {},
      [props.route.params.return.id],
      onSuccessChangeStatus,
      onFailedChangeStatus,
    );
  };

  const onSuccessChangeStatus = res => {
    getDetail();
    setLoadingPrimary(false);
  };

  const onFailedChangeStatus = error => {
    setLoadingPrimary(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to change status',
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (props.route.params.return) getDetail();
      else navigation.goBack();
    }, [props.route.params.return.id])
  );

  return (
    <Layout>
      <View style={{flex: 1}}>
        <Header
          title={props.route.params.return.reference}
          useLeftIcon={true}
          rightIcon={
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Icon name="menu" type="entypo" />
            </TouchableOpacity>
          }
        />
        <Divider />

        {!loading ? (
          <View style={styles.container}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer} // Added style for scroll container
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => getDetail()}
                />
              }>
              <RenderContent dataSelected={dataSelected} />
            </ScrollView>

            {dataSelected?.state == 'confirmed' && (
              <View>
                <AbsoluteButton
                  loading={loadingPrimary}
                  onPress={() =>
                    changeStatus({url: 'retrun-status-picking'})
                  }
                  postion={{
                    bottom: -30,
                    left: 260,
                  }}
                  content={
                    <View>
                      <FontAwesomeIcon
                        icon={faTruck}
                        size={30}
                        color={'white'}
                      />
                      <Text style={{color: 'white', fontSize: 10}}>
                        Picking
                      </Text>
                    </View>
                  }
                />
              </View>
            )}

            {dataSelected?.state == 'picking' && (
              <View>
                <AbsoluteButton
                  loading={loadingPrimary}
                  onPress={() =>
                    changeStatus({url: 'return-status-picked'})
                  }
                  postion={{
                    bottom: -30,
                    left: 260,
                  }}
                  content={
                    <View>
                      <FontAwesomeIcon
                        icon={faCheck}
                        size={30}
                        color={'white'}
                      />
                      <Text style={{color: 'white', fontSize: 10}}>
                        Picked
                      </Text>
                    </View>
                  }
                />
              </View>
            )}
            {dataSelected?.state == 'picked' && (
              <View>
                <AbsoluteButton
                  loading={loadingPrimary}
                  onPress={() =>
                    changeStatus({url: 'retrun-status-dispatch'})
                  }
                  postion={{
                    bottom: -30,
                    left: 260,
                  }}
                  content={
                    <View>
                      <FontAwesomeIcon
                        icon={faCheckDouble}
                        size={30}
                        color={'white'}
                      />
                      <Text style={{color: 'white', fontSize: 10}}>
                        Dispatched
                      </Text>
                    </View>
                  }
                />
              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={MAINCOLORS.primary} />
          </View>
        )}
        <BottomSheet modalProps={{}} isVisible={open}>
          <View style={styles.wrapper}>
            <Header
              title="Menu"
              rightIcon={
                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  style={{marginRight: 15}}>
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
            <View style={{marginVertical: 15}}>
              {dataSelected?.type == 'pallet' ? (
                <ListItem
                  onPress={() => {
                    navigation.navigate('Return Pallet', {
                      return: dataSelected,
                    });
                    setOpen(false);
                  }}>
                  <FontAwesomeIcon icon={faPallet} size={18} />
                  <ListItem.Content>
                    <ListItem.Title>Pallet in Return</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ) : (
                <ListItem
                  onPress={() => {
                    navigation.navigate('Return Stored Items', {
                      return: dataSelected,
                    });
                    setOpen(false);
                  }}>
                  <FontAwesomeIcon icon={faNarwhal} size={18} />
                  <ListItem.Content>
                    <ListItem.Title>Stored Items in Retrun</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              )}
            </View>
          </View>
        </BottomSheet>
      </View>
    </Layout>
  );
};

const RenderContent = ({dataSelected = {}}) => {
  return (
    <View style={styles.containerContent}>
      <View style={styles.barcodeContainer}>
        <Barcode value={`${dataSelected?.reference}`} width={1} height={70} />
        <Text style={styles.barcodeText}>{`${dataSelected?.reference}`}</Text>
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Reference"
          text={defaultTo(dataSelected?.reference, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Boxes"
          text={defaultTo(dataSelected?.number_boxes, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Oversizes"
          text={defaultTo(dataSelected?.number_oversizes, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Pallets"
          text={defaultTo(dataSelected?.number_pallets, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Physical Goods"
          text={defaultTo(dataSelected?.number_physical_goods, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="State"
          text={
            <View
              style={{
                ...styles.stateContainer,
                backgroundColor: findColorFromAiku(
                  dataSelected?.state_icon?.color,
                ),
              }}>
              <FontAwesomeIcon
                icon={dataSelected?.state_icon?.icon}
                color="white"
                size={12}
              />
              <Text style={{fontSize: 12, color: 'white'}}>
                {defaultTo(dataSelected.state_label, '-')}
              </Text>
            </View>
          }
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Created At"
          text={dayjs(dataSelected.created_at).format('DD-MM-YYYY')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 65, // Adjust the padding to ensure buttons are visible
  },
  wrapper: {
    backgroundColor: '#ffffff',
    padding: 15,
  },
  scrollContainer: {
    flex: 1,
  },
  containerContent: {
    flex: 1,
    padding: 15,
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  chip: {
    marginVertical: 2,
    marginHorizontal: 2,
  },
  speedDial: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  stateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 5,
    paddingVertical: 2,
  },
});

export default RetrunDetail;