import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Pressable } from 'react-native';
import {Chip} from 'react-native-paper';
import {Request} from '~/Utils';
import {Card} from 'react-native-paper';
import {isNull, defaultTo} from 'lodash';
import {useSelector} from 'react-redux';
import {COLORS} from '~/Constant/Color';

function Scanner(props: Object) {
  const dayjs = require('dayjs');
  const [loading, setLoading] = useState<boolean>(true);
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [dataSelected, setDataSelected] = useState<object | null>();
  console.log('ssss',warehouse)

  useEffect(() => {
    getDetail();
  }, []);

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
        props.route.params.location.slug,
      ],
      onSuccessGetDetail,
      onFailedGetDetail,
    );
  };

  const onSuccessGetDetail = (response: Object) => {
    console.log('sdfsdf', response);
    setDataSelected(response);
    setLoading(false);
  };

  const onFailedGetDetail = (error: Object) => {
    setLoading(false);
    console.log('show', error);
  };

  return !loading ? (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardContent}>
            <View style={styles.info}>
              <Text style={styles.name}>{dataSelected.code}</Text>
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
                  <Text style={styles.descriptionTitle}>Audited At:</Text>
                  <Text style={styles.descriptionText}>
                    {dataSelected.audited_at && !isNull(dataSelected.audited_at)
                      ? dayjs(dataSelected.audited_at).format('DD/MM/YY')
                      : '-'}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionTitle}>Stock Value:</Text>
                  <Text style={styles.descriptionText}>
                    {dataSelected.stock_value}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionTitle}>Max Volume:</Text>
                  <Text style={styles.descriptionText}>
                    {defaultTo(dataSelected.max_volume, '-')}
                  </Text>
                </View>
                <View style={styles.descriptionRow}>
                  <Text style={styles.descriptionTitle}>Max Weight:</Text>
                  <Text style={styles.descriptionText}>
                    {defaultTo(dataSelected.max_weight, '-')}
                  </Text>
                </View>
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Pallete</Text>
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
