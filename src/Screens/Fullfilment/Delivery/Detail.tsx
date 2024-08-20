import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Request, IconColor} from '~/Utils';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  BottomSheet,
  Icon,
  Chip,
  Dialog,
  Divider,
  ListItem,
} from '@rneui/themed';
import {defaultTo, isNull} from 'lodash';
import dayjs from 'dayjs';
import {MAINCOLORS} from '~/Utils/Colors';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Barcode from 'react-native-barcode-builder';
import Information from '~/Components/loactionComponents/Information';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';

const DeliveryDetail = props => {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const buttonFeatures = [
/*     {
      icon: {
        name: 'info',
        type: 'material-icons',
      },
      key: 'info',
      containerStyle: { borderBottomWidth: 1 },
      title: 'Information',
      onPress: () => {
        setOpenDialogInfo(true);
        setOpen(false);
      },
    }, */
    {
      icon: {
        name: 'truck',
        type: 'font-awesome-5',
      },
      key: 'pallet',
      title: 'Pallet in Delivery',
      onPress: () => {
        navigation.navigate('Delivery Pallet', { delivery: dataSelected });
        setOpen(false);
      },
    },
  ];

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

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Layout>
      <Header
        title={props.route.params.delivery.reference}
        useLeftIcon={true}
        rightIcon={
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Icon name="menu" type="entypo" />
          </TouchableOpacity>
        }
      />
      <Divider />
      <View style={styles.container}>
        {!loading ? (
          <View>
            <ScrollView>
              <RenderContent dataSelected={dataSelected} />
            </ScrollView>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
      <BottomSheet modalProps={{}} isVisible={open}>
        <View style={styles.wrapper}>
          <Header
            title="Setting"
            rightIcon={
              <TouchableOpacity
                onPress={() => setOpen(false)}
                style={{ marginRight: 20 }}>
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
          <View style={{ marginVertical: 15 }}>
            {buttonFeatures.map((l, i) => (
              <ListItem
                key={i}
                containerStyle={{ ...l.containerStyle }}
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
};

export const RenderContent = ({dataSelected = {}}) => {
  return (
    <View style={styles.containerContent}>
      <View style={styles.barcodeContainer}>
        <Barcode value={`${dataSelected.reference}`} width={1} height={70} />
        <Text style={styles.barcodeText}>{`${dataSelected.reference}`}</Text>
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Reference"
          text={defaultTo(dataSelected.reference, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Boxes"
          text={defaultTo(dataSelected.number_boxes, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Oversizes"
          text={defaultTo(dataSelected.number_oversizes, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Pallets"
          text={defaultTo(dataSelected.number_pallets, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Number Physical Goods"
          text={defaultTo(dataSelected.number_physical_goods, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="State"
          text={defaultTo(dataSelected.state_label, '-')}
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
    backgroundColor: '#FFFFFF', // Set background color to white
  },
  wrapper: {
    backgroundColor: '#ffffff',
    padding: 15,
  },
  containerContent: {
    flex: 1,
    padding: 15,
  },
  rowDetail: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC', // Light gray border color
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
});

export default DeliveryDetail;
