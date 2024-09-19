import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {reduxData} from '~/types/types';
import {COLORS} from '~/Utils/Colors';
import dayjs from 'dayjs';
import { Data } from '~/types/ShowDeliveryNoteTypes';
import Picking from '~/Components/DeliveryNote/Picking';
import { Daum } from '~/types/indexDeliveryNoteItems';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faForklift, faInventory } from 'assets/fa/pro-light-svg-icons';

type Props = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      deliveryNote: Data;
    };
    path: string;
  };
};

const DeliveryNotesItems = (props: Props) => {
  const oraganisation = useSelector(
    (state: reduxData) => state.organisationReducer,
  );
  const warehouse = useSelector((state: reduxData) => state.warehouseReducer);
  const [pickingStock, setPickingStock] = useState<Object | null>(null);
  const [pickingVisible, setPickingVisible] = useState<Boolean>(false);
  const [formType, setFormType] = useState<String>('default');
  const _baseList = useRef();

  const onSelect = (item : Daum, type = 'default') => {
    setPickingVisible(true);
    setPickingStock(item);
    setFormType(type);
  };

  const itemList = ( record : Daum ) => {
    return (
      <View style={{...styles.container, backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => onSelect(record, 'default')}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{record.org_stock_code}</Text>
              <Text style={styles.description}>{record.org_stock_name}</Text>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                <Text style={{...styles.description, marginRight: 3}}>
                  Picking name : {record.vessel_picking} |
                </Text>

                <Text style={styles.description}>
                  Date :{'  '}
                  {record.picking_at
                    ? dayjs(record.picking_at).format('DD-MM-YYYY')
                    : '-'}
                </Text>
              </View>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                <Text style={{...styles.description, marginRight: 3}}>
                  Packer name : {record.picker_name} |
                </Text>

                <Text style={styles.description}>
                  Date :{'  '}
                  {record.packed_at
                    ? dayjs(record.packed_at).format('DD-MM-YYYY')
                    : '-'}
                </Text>
              </View>
            </View>
            <View>
              <Text>
                {record.quantity_required} / {record.quantity_picked}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };


  const renderHiddenItem = (item : Daum) => {
    return (
      <View style={styles.hiddenItemContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={()=>onSelect(item,'deleteQuantity')}>
          <FontAwesomeIcon icon={faForklift} size={30} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={()=>onSelect(item,'location')}>
          <FontAwesomeIcon icon={faInventory} size={30} color="#ffffff" />
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <>
      <BaseList
        ref={_baseList}
        itemList={itemList}
        leftOpenValue={0}
        rightOpenValue={-120}
        useScan={false}
        enableSwipe={true}
        hiddenItem={renderHiddenItem}
        title="Delivery Notes Pickings"
        itemKey="org_stock_code"
        urlKey="delivery-notes-item-index"
        sortSchema="org_stock_code"
        args={[
          oraganisation.active_organisation.id,
          warehouse.id,
          props.route.params.deliveryNote.id,
        ]}
      />
      <Picking
        visible={pickingVisible}
        onClose={() => setPickingVisible(false)}
        stock={pickingStock}
        formType={formType}
        onFailed={() => {
          setPickingVisible(false);
        }}
        onSuccess={() => {
          setPickingVisible(false);
          if (_baseList.current) _baseList.current.refreshList();
        }}
      />
    </>
  );
};

export default DeliveryNotesItems;

const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.grey6,
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    marginHorizontal: 5,
  },
  leftIconContainer: {
    marginRight: 18,
  },
  description: {
    fontSize: 12,
    color: COLORS.grey6,
  },

  hiddenItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#FAFAFA',
    paddingTop: 15,
    borderRadius: 10,
    marginVertical: 5,
    gap : 5
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  hiddenItemText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
