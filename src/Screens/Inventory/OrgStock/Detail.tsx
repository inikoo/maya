import React, {useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert,
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
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import Header from '~/Components/Header';
import Layout from '~/Components/Layout';
import AssociateLocation from '~/Components/Stock/AddAssosiateLocation';
import StockCheck from '~/Components/Stock/StockCheck.tsx';
import MoveStock from '~/Components/Stock/MoveStock';
import {DetailOrgStockTypes, reduxData, ItemOrgStockIndex, LocationTypesIndex, Location2 } from '~/Utils/types';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faInventory,
  faClipboard,
  faForklift,
  faUnlink,
  faTimesCircle,
  faPlusCircle,
  faShoppingBasket
} from 'assets/fa/pro-light-svg-icons';

library.add(
  faInventory,
  faClipboard,
  faForklift,
  faUnlink,
  faTimesCircle,
  faPlusCircle,
);

type Props = {
  navigation : any
  route : {
    key: string;
    name: string;
    params: {
      orgStock : ItemOrgStockIndex
    };
    path: string;
  }
}

function OrgStockDetail(props : Props) {
  const navigation = useNavigation();
  const organisation = useSelector((state : reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState<DetailOrgStockTypes | null >(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAssociateLocation, setOpenAssociateLocation] = useState(false);
  const [openStockControls, setOpenStockControls] = useState(false);
  const [openStockCheck, setOpenStockCheck] = useState(false);
  const [openMoveStock, setOpenMoveStock] = useState(false);
  const [selectedLocationStock, setSelectedLocationStock] = useState<Location2|null>(null);

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
        setOpenStockCheck(true), setOpenStockControls(false);
      },
    },
    {
      icon: faForklift,
      key: 'MoveStock',
      title: 'Move Stock',
      onPress: () => {
        setOpenMoveStock(true);
        setOpenStockControls(false);
      },
    },
    {
      icon: faUnlink,
      key: 'UnlinkLocation',
      title: 'Unlink Location',
      onPress: () => {
        setOpenStockControls(false);
        confirmUnlink();
      },
    },
    {
      icon: faShoppingBasket,
      key: 'pickingLocation',
      title: 'Set to be picking location',
      onPress: () => {
        setOpenStockControls(false);
        confirmChangeTypeLocation('picking');
      },
    },
    {
      icon: faShoppingBasket,
      key: 'StoringLocation',
      title: 'Set to be Storing location',
      onPress: () => {
        setOpenStockControls(false);
        confirmChangeTypeLocation('storing');
      },
    },
  ];

  const confirmUnlink = () => {
    Alert.alert(
      'Confirm Unlink',
      'Are you sure you want to unlink this location?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Unlink', onPress: () => diassosiateLocation()},
      ],
      {cancelable: true},
    );
  };

  const confirmChangeTypeLocation = (type : String) => {
    Alert.alert(
      'Confirm change type location',
      `Are you sure you want to set this location to be ${type} Location ?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Unlink', onPress: () => setTypeLocation()},
      ],
      {cancelable: true},
    );
  };
  
  const setTypeLocation = () => {
  }

  const diassosiateLocation = () => {
    setLoading(true);
    Request(
      'delete',
      'org-stock-diassosiate-location',
      {},
      {},
      [ selectedLocationStock?.id],
      diassosiateLocationSuccsess,
      diassosiateLocationfailed,
    );
  };

  const diassosiateLocationSuccsess = (response : any) =>{
    setLoading(false);
    setDataSelected(response.data)
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'success diassosiate location',
    });
  }

  const diassosiateLocationfailed = (error : any) =>{
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed diassosiate location',
    });
}

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

  const onSuccessGetDetail = (response : any) => {
    setDataSelected(response);
    setLoading(false);
    setRefreshing(false);
  };

  const onFailedGetDetail = (error : any) => {
    setLoading(false);
    setRefreshing(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

/*   const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }; */

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
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 12,
              }}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Locations:
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setOpenAssociateLocation(true);
                }}>
                <FontAwesomeIcon icon={faPlusCircle} size={18} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.locationsScroll}>
              <View style={styles.rowContainer}>
                {dataSelected.locations.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setOpenStockControls(true),
                      setSelectedLocationStock(item);
                    }}
                    key={index}
                    style={[
                      styles.itemContainer,
                      { backgroundColor: item.type === 'picking' ? MAINCOLORS.primary : '#CBD5E1'},
                    ]}>
                    <Text style={{color : item.type === 'picking' ? '#ffff' : '', fontWeight : 500}}>
                      {item.location.code} ( {item.quantity} )
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

 const filterMenuLocation = () => {
  if(selectedLocationStock && selectedLocationStock.type == 'picking'){
    return menuControl.filter((item)=>item.key != "pickingLocation")
  } 
  return menuControl
 }

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
          onSuccess={()=>getDetail()}
          data={selectedLocationStock}
          stockId={dataSelected?.id}
        />
        <StockCheck
          visible={openStockCheck}
          onClose={() => setOpenStockCheck(false)}
          onSuccess={()=>getDetail()}
          data={selectedLocationStock}
          stockId={dataSelected?.id}
        />
        <MoveStock
          visible={openMoveStock}
          onClose={() => setOpenMoveStock(false)}
          onSuccess={()=>getDetail()}
          data={selectedLocationStock}
          stockId={dataSelected?.id}
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
                <FontAwesomeIcon icon={faTimesCircle} color="red" size={20} />
              </TouchableOpacity>
            </View>
            <Divider style={{marginVertical: 10}} />
            <View>
              {filterMenuLocation().map((l, i) => (
                <ListItem
                  key={i}
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
  /* itemText: {
    color: 'white',
  }, */
  locationsScroll: {
    maxHeight: 150,
  },
});

export default OrgStockDetail;
