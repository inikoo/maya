import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Request, IconColor } from '~/Utils';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Text, BottomSheet, Icon, Chip, Dialog, Divider, ListItem } from '@rneui/themed';
import { defaultTo, isNull } from 'lodash';
import dayjs from 'dayjs';
import { MAINCOLORS } from '~/Utils/Colors';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Barcode from 'react-native-barcode-builder';
import Information from '~/Components/loactionComponents/Information';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import {reduxData, LocationTypesIndex, DetailLocationTypes } from '~/types/types'

type Props = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      location: LocationTypesIndex;
    };
    path: string;
  };
};


const Detail = (props : Props) => {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector((state : reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState<DetailLocationTypes | null>(null);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [openDialogInfo, setOpenDialogInfo] = useState(false);

  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'locations-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        props.route.params.location.id,
      ],
      onSuccessGetDetail,
      onFailedGetDetail,
    );
  };

  const onSuccessGetDetail = (response : any) => {
    setDataSelected(response);
    setLoading(false);
  };

  const onFailedGetDetail = (error : any) => {
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

  const buttonFeatures = [
    {
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
    },
    {
      icon: {
        name: 'pallet',
        type: 'font-awesome-5',
      },
      key: 'pallet',
      title: 'Pallet in location',
      onPress: () => {
        navigation.navigate('Location Pallet', { location: dataSelected });
        setOpen(false);
      },
    },
  ];

  const setDialog = () => {
    setOpenDialogInfo(!openDialogInfo);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Layout>
      <>
      <Header
        title={props.route.params.location.code}
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
            <ScrollView><RenderContent dataSelected={dataSelected} /></ScrollView>
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

      <Dialog isVisible={openDialogInfo} onBackdropPress={setDialog}>
        <Dialog.Title title="Info" />
        <Information />
      </Dialog>
      </>
    </Layout>
  );
};


export const RenderContent: React.FC<DetailLocationTypes> = ({ dataSelected }) => {
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
          title="Status"
          text={(
            <Chip
              title={defaultTo(dataSelected.status, '-')}
              color={
                dataSelected?.status == 'operational'
                  ? MAINCOLORS.success
                  : MAINCOLORS.danger
              }
              buttonStyle={{ padding: 2, width : 100}}
              titleStyle={{ fontSize: 14 }}
            />
          )}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Created At"
          text={dayjs(dataSelected.created_at).format('DD-MM-YYYY')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Updated At"
          text={dayjs(dataSelected.updated_at).format('DD-MM-YYYY')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Audited At"
          text={
            dataSelected.audited_at && !isNull(dataSelected.audited_at)
              ? dayjs(dataSelected.audited_at).format('DD/MM/YY')
              : '-'
          }
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow title="Stock Value" text={dataSelected.stock_value} />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Max Volume"
          text={defaultTo(dataSelected.max_volume, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Max Weight"
          text={defaultTo(dataSelected.max_weight, '-')}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Tags"
          text={(
            <View style={styles.chipContainer}>
              {dataSelected.tags.map((tag : any , index : any) => (
                <Chip
                  key={index}
                  title={tag}
                  color={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                  buttonStyle={styles.chip}
                  titleStyle={{ fontSize: 12 }}
                />
              ))}
            </View>
          )}
        />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow
          title="Location status"
          text={(
            <View style={styles.iconContainer}>
              <View style={styles.row}>
                <Icon
                  name="box"
                  type="font-awesome-5"
                  size={15}
                  style={styles.icon}
                  color={IconColor(
                    dataSelected.allow_stocks,
                    dataSelected.has_stock_slots,
                  )}
                />
                <Icon
                  name="hand-holding-water"
                  type="font-awesome-5"
                  size={15}
                  style={styles.icon}
                  color={IconColor(
                    dataSelected.allow_dropshipping,
                    dataSelected.has_dropshipping_slots,
                  )}
                />
                <Icon
                  name="pallet"
                  type="font-awesome-5"
                  size={15}
                  style={styles.icon}
                  color={IconColor(
                    dataSelected.allow_fulfilment,
                    dataSelected.has_fulfilment,
                  )}
                />
              </View>
            </View>
          )}
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



export default Detail;