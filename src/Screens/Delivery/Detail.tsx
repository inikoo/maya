import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Request} from '~/Utils';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {Avatar, Text} from '@rneui/themed';
import {defaultTo} from 'lodash';
import BaseList from '~/Components/BaseList';
import { useNavigation } from '@react-navigation/native';
import DetailRow from '~/Components/DetailRow';

const DeliveryDetail = props => {
  const [loading, setLoading] = useState(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState(null);
  const navigation = useNavigation()

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

  const Item = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.containerItem}
        onPress={() => navigation.navigate('Pallet', {pallet: item})}>
        <View style={styles.row}>
          <Avatar
            size={40}
            icon={{name: 'pallet', type: 'FontAwesome6'}}
            containerStyle={{
              backgroundColor: MAINCOLORS.primary,
              marginRight: 13,
            }}
          />
          <View style={styles.row}>
            <View style={styles.text}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.reference}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.description}>{item.state_label}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={MAINCOLORS.primary} />
      ) : (
        <View style={styles.contentContainer}>
          <View
            style={{
              backgroundColor: MAINCOLORS.warning,
              padding: 20,
              borderRadius: 10,
            }}>
            <View style={styles.header}>
              <Avatar
                size={40}
                icon={{
                  name: 'truck',
                  type: 'font-awesome',
                  color: MAINCOLORS.white,
                }}
                containerStyle={styles.avatarContainer}
              />
              <Text style={styles.reference}>{dataSelected.reference}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <DetailRow
                title="Customer Name:"
                text={defaultTo(dataSelected.customer_name, '-')}
              />
              <DetailRow
                title="State:"
                text={defaultTo(dataSelected.state, '-')}
              />
            </View>
          </View>

          <ScrollView>
          <BaseList
            urlKey="delivery-pallet-index"
            args={[
              organisation.active_organisation.id,
              warehouse.id,
              props.route.params.delivery.id,
            ]}
            renderItem={Item}
            navigation={props.navigation}
            title="Delivery"
            scanner={false}
            settingButton={false}
            showRecords={false}
          />
          </ScrollView>

          
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINCOLORS.background,
    /*     paddingHorizontal: 20,
    paddingVertical: 20 */
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatarContainer: {
    backgroundColor: MAINCOLORS.primary,
    marginRight: 13,
  },
  reference: {
    fontWeight: '500',
    fontSize: 20,
  },
  detailsContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 6,
  },
  containerItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: COLORS.grey6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    margin: 5,
  },
});

export default DeliveryDetail;
