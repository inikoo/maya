import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
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
  CheckBox,
} from '@rneui/themed';
import {defaultTo} from 'lodash';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Barcode from 'react-native-barcode-builder';
import {useNavigation} from '@react-navigation/native';
import {MAINCOLORS} from '~/Utils/Colors';
import Header from '~/Components/Header';
import Layout from '~/Components/Layout';
import Button from '~/Components/Button';

function PalletDetail(props) {
  const navigation = useNavigation();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialogStatus, setOpenDialogStatus] = useState(false);
  const [openDialogLocation, setOpenDialogLocation] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [locationCode, setLocationCode] = useState(null);
  const [errorLocationCode, setErrorLocationCode] = useState("");

  const ChangeStatus = async () => {
    await Request(
      'patch',
      'pallet-change-status-state',
      {},
      {state: selectedStatus},
      [dataSelected.id],
      ChangeStatusSuccess,
      ChangeStatusFailed,
    );
  };

  const ChangeStatusSuccess = response => {
    setOpenDialogStatus(false);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet status updated',
    });
    getDetail();
  };

  const ChangeStatusFailed = response => {
    const message = response?.response?.data?.message || 'Server error';
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Failed',
      textBody: message,
    });
  };


  const getLocationCode = async () => {
    await Request(
      'get',
      'locations-show-by-code',
      {},
      {},
      [   
       organisation.active_organisation.id,
       warehouse.id,
       locationCode
      ],
      LocationCodeSuccess,
      LocationCodeFailed,
    );
  };

  const LocationCodeSuccess = async (response) => {
    await Request(
      'patch',
      'pallet-location',
      {},
      {},
      [
       response.id, 
       dataSelected.id
       
      ],
      ChangeLocationSuccess,
      ChangeLocationFailed,
    );
  };

  const LocationCodeFailed = response => {
    if(response.response.status == 404){
      setErrorLocationCode('cannot find location')
    }else {
      setErrorLocationCode(response?.response?.data?.message || 'Server error')
    }
  };

  const ChangeLocationSuccess = response =>{
    setOpenDialogLocation(false)
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet location updated',
    });
    getDetail();
  }

  const ChangeLocationFailed = error =>{
    console.log('errorMove',error)
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  }

  

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

  const onSuccessGetDetail = response => {
    setDataSelected(response.data);
    setLoading(false);
    setSelectedStatus(response.data.status);
    setLocationCode(response.data.location?.resource?.code);
  };

  const onFailedGetDetail = error => {
    setLoading(false);
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
            text={defaultTo(dataSelected.status, '-')}
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
        setOpenDialogLocation(true);
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

  const closeDialog = () => {
    setOpenDialogStatus(false);
    setOpenDialogLocation(false)
  };

  const onCancel = () => {
    setSelectedStatus(dataSelected.status);
    setLocationCode(dataSelected.location?.resource?.code);
    closeDialog();
  };

  const onChangeCode = (value : String) =>{
      setLocationCode(value)
      setErrorLocationCode('')
  }

  useEffect(() => {
    getDetail();
  }, [props.route.params.pallet]);

  return (
    <Layout>
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
        <ScrollView>{renderContent()}</ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={MAINCOLORS.primary} />
        </View>
      )}
      <Dialog isVisible={openDialogStatus}>
        <Dialog.Title title="Change State" />
        <View>
          <CheckBox
            title="Storing"
            checked={selectedStatus === 'storing'}
            onPress={() => setSelectedStatus('storing')}
          />
          <CheckBox
            title="Lost"
            checked={selectedStatus === 'lost'}
            onPress={() => setSelectedStatus('lost')}
          />
          <CheckBox
            title="Damaged"
            checked={selectedStatus === 'damaged'}
            onPress={() => setSelectedStatus('damaged')}
          />
          <CheckBox
            title="Picking"
            checked={selectedStatus === 'picking'}
            onPress={() => setSelectedStatus('picking')}
          />
          <CheckBox
            title="Picked"
            checked={selectedStatus === 'picked'}
            onPress={() => setSelectedStatus('picked')}
          />
          <CheckBox
            title="Dispatched"
            checked={selectedStatus === 'dispatched'}
            onPress={() => setSelectedStatus('dispatched')}
          />
          <View style={styles.dialogButtonContainer}>
            <Button type="secondary" title="Cancel" onPress={onCancel} />
            <Button type="primary" title="Submit" onPress={ChangeStatus} />
          </View>
        </View>
      </Dialog>

      <Dialog isVisible={openDialogLocation}>
        <Dialog.Title title="Change Location" />
        <Divider />
        <View>
          <Text style={styles.textLabel}>Location Code : </Text>
          <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Code" value={locationCode} onChangeText={onChangeCode}/>
            </View>
            <View style={styles.buttonScan}>
              <TouchableOpacity style={styles.searchIcon} onPress={()=>navigation.navigate('Change Location Pallet Scanner',{ pallet : dataSelected })}>
                <Icon name="qr-code-scanner" type="material" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ color : 'red', fontSize : 12 }}>{errorLocationCode}</Text>
          <Divider style={{ marginTop : 20}}/>
          <View style={styles.dialogButtonContainer}>
            <Button type="secondary" title="Cancel" onPress={onCancel} />
            <Button type="primary" title="Submit" onPress={getLocationCode}/>
          </View>
        </View>
      </Dialog>

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
    paddingVertical : 8,
    paddingHorizontal : 5
  },
  textLabel : {
    fontWeight : "500",
    marginTop : 20
  }
});

export default PalletDetail;
