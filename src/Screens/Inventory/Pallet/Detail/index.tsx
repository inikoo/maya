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
import ChangeLocation from '~/Components/ChangeLocationPallet';
import ChangeStatusPallet from '~/Components/ChangeStatusPallet';
import {reduxData, PalletTypesIndex, PalletDetailTypes} from '~/Types/types';

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
      pallet: PalletTypesIndex;
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
  const [dataSelected, setDataSelected] = useState<PalletDetailTypes | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [openDialogStatus, setOpenDialogStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const buttonFeatures = [
    {
      icon: {
        name: 'location-pin',
        type: 'material-icons',
      },
      key: 'move_location',
      containerStyle: {borderBottomWidth: 1},
      title: 'Move Location',
      onPress: () => {
        setOpenLocation(true);
        setOpen(false);
      },
    },
    {
      icon: {
        name: 'edit',
        type: 'material-icons',
      },
      key: 'change_status',
      title: 'Change Status',
      onPress: () => {
        setOpenDialogStatus(true);
        setOpen(false);
      },
    },
  ];

  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'pallet-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        organisation.active_organisation.active_authorised_fulfilments.id,
        props.route.params.pallet.id,
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
            title="Customer Name"
            text={defaultTo(dataSelected.customer.name, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Customer Reference"
            text={defaultTo(dataSelected.customer_reference, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Location"
            text={defaultTo(dataSelected.location?.resource.code, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Status"
            text={
              <View
                style={{
                  flexDirection: 'row',
                  width: 100,
                  gap: 4,
                  backgroundColor: findColorFromAiku(
                    dataSelected.status_icon.color,
                  ),
                  paddingHorizontal: 10,
                  borderRadius: 30,
                  paddingVertical: 3,
                }}>
                <FontAwesomeIcon
                  color="#ffff"
                  size={12}
                  icon={dataSelected.status_icon.icon}
                  style={{marginVertical: 3}}
                />
                <Text style={{color: '#ffff', fontSize: 12}}>
                  {dataSelected.status}
                </Text>
              </View>
            }
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow title="State" text={defaultTo(dataSelected.state, '-')} />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow title="Notes" text={defaultTo(dataSelected.notes, '-')} />
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
      if (!props.route.params.pallet) navigation.goBack();
      else getDetail();
    }, [props.route.params.pallet]),
  );

  return (
    <Layout>
      <View style={{flex: 1}}>
        <Header
          title={props.route.params.pallet.reference}
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

        <ChangeStatusPallet
          visible={openDialogStatus}
          pallet={dataSelected}
          onClose={() => setOpenDialogStatus(false)}
        />

        <ChangeLocation
          visible={openLocation}
          onClose={() => {
            setOpenLocation(false);
          }}
          pallet={dataSelected?.id}
          bulk={false}
          onSuccess={() => getDetail()}
        />

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
            <View style={{marginVertical: 15}}>
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
  wrapper: {
    backgroundColor: '#ffffff',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  divider: {
    marginBottom: 15,
  },
  dialogButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '81%',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  buttonScan: {
    width: '15%',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 3,
  },
  searchIcon: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  textLabel: {
    fontWeight: '500',
    marginTop: 20,
  },
});

export default PalletDetail;
