import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Request, IconColor} from '~/Utils';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Text, SpeedDial, Icon, Chip, Dialog} from '@rneui/themed';
import {defaultTo, isNull} from 'lodash';
import dayjs from 'dayjs';
import {MAINCOLORS} from '~/Utils/Colors';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Barcode from 'react-native-barcode-builder';
import Information from '~/Components/loactionComponents/Information';


const Detail = props => {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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

  const onSuccessGetDetail = response => {
    setDataSelected(response);
    setLoading(false);
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
    return (
      <View style={styles.containerContent}>
        <View style={styles.barcodeContainer}>
          <Barcode value={`loc-${dataSelected.slug}`} width={1} height={70} />
          <Text style={styles.barcodeText}>{`loc-${dataSelected.slug}`}</Text>
        </View>
        <View style={styles.rowDetail}>
          <DetailRow title="Code" text={defaultTo(dataSelected.code, '-')} />
        </View>
        <View style={styles.rowDetail}>
          <DetailRow
            title="Status"
            text={() => {
              return (
                <Chip
                  title={defaultTo(dataSelected.status, '-')}
                  color={
                    dataSelected?.status == 'operational'
                      ? MAINCOLORS.success
                      : MAINCOLORS.danger
                  }
                  buttonStyle={{padding: 1, marginHorizontal: 2}}
                  titleStyle={{fontSize: 14}}
                />
              );
            }}
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
            text={() => {
              return dataSelected.tags.map((tag, index) => (
                <Chip
                  key={index}
                  title={tag}
                  color={`#${Math.floor(Math.random() * 16777215).toString(
                    16,
                  )}`}
                  buttonStyle={{padding: 1, marginHorizontal: 2}}
                  titleStyle={{fontSize: 12}}
                />
              ));
            }}
          />
        </View>

        <View style={styles.rowDetail}>
          <DetailRow
            title="Location status"
            text={() => (
              <View style={styles.iconContainer}>
                <View style={styles.row}>
                  <Icon
                    name="box"
                    type="font-awesome-5"
                    size={15}
                    style={{...styles.icon}}
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

  const setDialog = () => {
    setOpenDialog(!openDialog);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return !loading ? (
    <View style={styles.container}>
      <ScrollView>{renderContent()}</ScrollView>
      <SpeedDial
        isOpen={open}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        style={styles.speedDial} // Added style prop
        onPress={() => setOpen(!open)}>
        <SpeedDial.Action
          icon = {{name: 'info', type: 'antdesign'}}
          title = 'Info'
          onPress = {() => setDialog()}
        />
        <SpeedDial.Action
          icon={{name: 'pallet'}}
          title="Pallet"
          onPress={() =>
            navigation.navigate('Location Pallet', {location: dataSelected})
          }
        />
      </SpeedDial>
      <Dialog isVisible={openDialog} onBackdropPress={setDialog}>
        <Dialog.Title title="Info" />
        <Information />
      </Dialog>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Set background color to white
  },
  containerContent: {
    flex: 1,
    padding: 20,
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
