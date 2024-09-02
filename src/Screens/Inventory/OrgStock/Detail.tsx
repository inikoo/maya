import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Request} from '~/Utils';
import {useSelector} from 'react-redux';
import {
  Text,
  Divider,
  Icon,
  BottomSheet,
  ListItem,
  Dialog,
} from '@rneui/themed';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {defaultTo} from 'lodash';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Barcode from 'react-native-barcode-builder';
import {MAINCOLORS} from '~/Utils/Colors';
import Header from '~/Components/Header';
import Layout from '~/Components/Layout';
import AssociateLocation from '~/Components/Stock/AddAssosiateLocation';
import StockCheck from '~/Components/Stock/StockCheck.tsx'
import MoveStock from '~/Components/Stock/MoveStock'

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faInventory,
  faClipboard,
  faForklift,
  faUnlink,
  faTimesCircle,
} from 'assets/fa/pro-light-svg-icons';

library.add(faInventory, faClipboard, faForklift, faUnlink, faTimesCircle);

function OrgStockDetail(props) {
  const navigation = useNavigation();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAssociateLocation, setOpenAssociateLocation] = useState(false);
  const [openStockControls, setOpenStockControls] = useState(false);
  const [openStockCheck, setOpenStockCheck] = useState(false);
  const [openMoveStock, setOpenMoveStock] = useState(false);

  const buttonFeatures = [
    {
      icon: faInventory,
      key: 'associate-location',
      title: 'Add Associate Location',
      onPress: () => {
        setOpen(false);
        setOpenAssociateLocation(true);
      },
    },
  ];

  const menuControl = [
    {
      icon: faClipboard,
      key: 'StockCheck',
      title: 'Stock Check',
      onPress: () => {
        setOpenStockCheck(true),
        setOpenStockControls(false)
      },
    },
    {
      icon: faForklift,
      key: 'MoveStock',
      title: 'Move Stock',
      onPress: () => {
        setOpenMoveStock(true)
        setOpenStockControls(false)
      },
    },
    {
      icon: faUnlink,
      key: 'UnlinkLocation',
      title: 'Unlink Location',
      onPress: () => {
        setOpenStockControls(false)
        confirmUnlink()
      },
    },
  ];

  const confirmUnlink = () => {
    Alert.alert(
      "Confirm Unlink",
      "Are you sure you want to unlink this location?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Unlink", onPress: () => handleUnlink() }
      ],
      { cancelable: true }
    );
  };
  
  const handleUnlink = () => {
    // Your unlink logic here
    console.log("Location unlinked");
  };

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

  const locationsDummy = [
    {
      reference: '1A1',
      stock: 200,
    },
    {
      reference: '1A2',
      stock: 400,
    },
    {
      reference: '1A3',
      stock: 400,
    },
    {
      reference: '1A4',
      stock: 400,
    },
    {
      reference: '1A5',
      stock: 400,
    },
    {
      reference: '1A6',
      stock: 400,
    },
    {
      reference: '1A7',
      stock: 400,
    },
    {
      reference: '1A8',
      stock: 400,
    },
  ];

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
        <View style={styles.rowDetail}>
          <View>
            <Text style={{fontWeight: 'bold', marginBottom: 10}}>
              Locations:
            </Text>
            <ScrollView style={styles.locationsScroll}>
              <View style={styles.rowContainer}>
                {locationsDummy.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => setOpenStockControls(true)}
                    key={index}
                    style={[
                      styles.itemContainer,
                      {backgroundColor: getRandomColor()},
                    ]}>
                    <Text style={styles.itemText}>
                      {item.reference} ( {item.stock} )
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
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
      <View style={{flex: 1}}>
        <Header
          title={props.route.params.orgStock.name}
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
              {buttonFeatures.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={{...l.containerStyle}}
                  onPress={l.onPress}>
                  <FontAwesomeIcon icon={l.icon} />
                  <ListItem.Content>
                    <ListItem.Title>{l.title}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          </View>
        </BottomSheet>
        <AssociateLocation
          visible={openAssociateLocation}
          onClose={() => setOpenAssociateLocation(false)}
        />
        <StockCheck 
            visible={openStockCheck}
            onClose={() => setOpenStockCheck(false)}
        />
        <MoveStock 
           visible={openMoveStock}
           onClose={() => setOpenMoveStock(false)}
        />

        <Dialog isVisible={openStockControls}>
          <View style={{width: '100%', paddingVertical: 5}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '700', fontSize: 20}}>
                Stock Controls
              </Text>
              <TouchableOpacity onPress={() => setOpenStockControls(false)}>
                <FontAwesomeIcon icon={faTimesCircle} color="red" size={20}/>
              </TouchableOpacity>
            </View>
            <Divider style={{ marginVertical : 10}}/>
            <View>
              {menuControl.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={{...l.containerStyle}}
                  onPress={l.onPress}>
                  <FontAwesomeIcon icon={l.icon} />
                  <ListItem.Content>
                    <ListItem.Title>{l.title}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          </View>
        </Dialog>
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
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  itemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    backgroundColor: 'red',
    borderRadius: 25,
    marginBottom: 5,
  },
  itemText: {
    color: 'white',
  },
  locationsScroll: {
    maxHeight: 150, // Limit height to ensure it scrolls if too many items
  },
});

export default OrgStockDetail;