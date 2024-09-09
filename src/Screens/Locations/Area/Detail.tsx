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
import { MAINCOLORS } from '~/Utils/Colors';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import DetailRow from '~/Components/DetailRow';
import Information from '~/Components/loactionComponents/Information';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';
import {reduxData, LocationTypesIndex, DetailLocationTypes } from '~/Types/types'

type Props = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      area: LocationTypesIndex;
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

  const buttonFeatures = [
    {
      icon: {
        name: 'pallet',
        type: 'font-awesome-5',
      },
      key: 'pallet',
      title: 'Location in ',
      onPress: () => {
        navigation.navigate('Location Pallet', { location: dataSelected });
        setOpen(false);
      },
    },
  ];

  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'warehouse-area-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        props.route.params.area.id,
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
        title={props.route.params.area.code}
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


export const RenderContent: React.FC<DetailLocationTypes | null > = ({ dataSelected }) => {
  return (
    <View style={styles.containerContent}>
      {/* <View style={styles.barcodeContainer}>
        <Barcode value={`${dataSelected.slug}`} width={1} height={70} />
        <Text style={styles.barcodeText}>{`${dataSelected.slug}`}</Text>
      </View> */}
      <View style={styles.rowDetail}>
        <DetailRow title="Code" text={defaultTo(dataSelected?.code, '-')} />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow title="Name" text={defaultTo(dataSelected?.name, '-')} />
      </View>
      <View style={styles.rowDetail}>
        <DetailRow title="number Locations" text={defaultTo(dataSelected?.number_locations, '-')} />
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