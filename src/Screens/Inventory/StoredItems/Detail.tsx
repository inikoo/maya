import React, {useState, useCallback} from 'react';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {defaultTo} from 'lodash';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Barcode from 'react-native-barcode-builder';
import {MAINCOLORS} from '~/Utils/Colors';
import Header from '~/Components/Header';
import Layout from '~/Components/Layout';
import {reduxData} from '~/types/types';
import {Data} from '~/types/ShowStoredItemTypes';
/* import ChangePalletStoredItem from '~/Components/ChangePalletStoredItem' */

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
      item: Data;
    };
    path: string;
  };
};

function ShowStoredItem(props: Props) {
  const navigation = useNavigation();
  const organisation = useSelector((state: reduxData) => state.organisationReducer);
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const buttonFeatures = [
    {
      icon: faPallet,
      title: 'Pallet Contained',
      key: 'pallet_contained',
      onPress: () => {
        setOpen(false);
        navigation.navigate('StoredItemPalletContained',{item : dataSelected})
      },
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
            title="Customer Name"
            text={defaultTo(dataSelected.customer_name, '-')}
          />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Quantity"
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
                {defaultTo(dataSelected.state_icon.tooltip, '-')}
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


      {/*   <ChangePalletStoredItem
            visible={changePalletVisible}
            onClose={()=>setChangePalletVisible(false)}
            item={}
        />
 */}
        <BottomSheet isVisible={open}>
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
                  <FontAwesomeIcon icon={l.icon} size={18} />
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
  stateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 5,
    paddingVertical: 2,
  },
});

export default ShowStoredItem;
