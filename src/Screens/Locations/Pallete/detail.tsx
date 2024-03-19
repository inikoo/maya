import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Pressable } from 'react-native';
import {Chip} from 'react-native-paper';
import {Request} from '~/Utils';
import {Card} from 'react-native-paper';
import {isNull, defaultTo} from 'lodash';
import {useSelector} from 'react-redux';
import {COLORS} from '~/Constant/Color';
import { useNavigation } from '@react-navigation/native';

function Scanner(props: Object) {
  const dayjs = require('dayjs');
  const [loading, setLoading] = useState<boolean>(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState<object | null>();
  const navigation = useNavigation()

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = () => {
    setLoading(true);
    Request(
      'get',
      'pallate-show',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        organisation.active_organisation.active_authorised_fulfilments.slug,
        props.route.params.pallete.slug,
      ],
      onSuccessGetDetail,
      onFailedGetDetail,
    );
  };
  

  const palletRetrun = () => {
    Request(
      'patch',
      'pallete-return',
      {},
      {},
      [
        organisation.active_organisation.id,
        warehouse.id,
        organisation.active_organisation.active_authorised_fulfilments.slug,
        dataSelected.slug,
      ],
     (response)=>navigation.navigate('Home'),
     (response)=>console.log('res',response),
    );
  };
  

  const onSuccessGetDetail = (response: Object) => {
    console.log('ss',response)
    setDataSelected(response.data);
    setLoading(false);
  };

  const onFailedGetDetail = (error: Object) => {
    setLoading(false);
    console.log('show', error);
  };

  return !loading && dataSelected ? (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardContent}>
            <View style={styles.info}>
              <Text style={styles.name}>{dataSelected.slug}</Text>
              <View style={styles.rowContainer}>
                <Chip
                  style={{
                    marginHorizontal: 4,
                    backgroundColor:
                      dataSelected.status != 'operational' ? 'red' : '#87D068',
                  }}>
                  <Text style={styles.price}>{dataSelected.status}</Text>
                </Chip>
                {dataSelected.is_empty && (
                  <Chip
                    style={{
                      marginHorizontal: 4,
                      backgroundColor: 'purple',
                    }}>
                    <Text style={styles.price}>Empty</Text>
                  </Chip>
                )}
              </View>

              <View style={styles.descriptionContainer}>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionTitle}>Created At:</Text>
                  <Text style={styles.descriptionText}>
                    {dayjs(dataSelected.created_at).format('DD/MM/YY')}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionTitle}>Updated At:</Text>
                  <Text style={styles.descriptionText}>
                    {dayjs(dataSelected.updated_at).format('DD/MM/YY')}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionTitle}>State :</Text>
                  <Text style={styles.descriptionText}>
                  {defaultTo(dataSelected.state, '-')}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionTitle}>Customer Name :</Text>
                  <Text style={styles.descriptionText}>
                  {defaultTo(dataSelected.customer_name, '-')}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionTitle}>Customer Reference:</Text>
                  <Text style={styles.descriptionText}>
                    {defaultTo(dataSelected.customer_reference, '-')}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionTitle}>Location :</Text>
                  <Text style={styles.descriptionText}>
                   
                  </Text>
                </View>
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={()=>navigation.navigate('Pallete',{location: dataSelected})}>
                <Text style={styles.buttonText}>Move</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={()=>palletRetrun()}>
                <Text style={styles.buttonText}>return</Text>
              </Pressable>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Stored Item</Text>
              </Pressable>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  ) : (
    <ActivityIndicator size="large" />
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 50,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 12,
    color: '#fefefe',
  },
  descriptionContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },

  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8f3c96',
    marginBottom: 5,
  },

  descriptionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cardContent: {
    padding: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Scanner;
