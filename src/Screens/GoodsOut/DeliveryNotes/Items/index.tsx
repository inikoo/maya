import React,{useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Card, Icon} from '@rneui/themed'; 
import {reduxData} from '~/types/types';
import {COLORS} from '~/Utils/Colors';
import dayjs from 'dayjs';
import {Data,Root} from '~/types/indexShowDelivery';
import { Request } from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faForklift
} from 'assets/fa/pro-light-svg-icons';

library.add(faForklift);


type Props = {
    navigation: any;
    route: {
      key: string;
      name: string;
      params: {
          deliveryNote : Data;
      };
      path: string;
    };
  };

const DeliveryNotesItems = (props : Props) => {
  const oraganisation = useSelector((state : reduxData) => state.organisationReducer);
  const warehouse = useSelector((state : reduxData) => state.warehouseReducer);
  const _baseList = useRef()
  const navigation = useNavigation()

  const itemList = record => {
    return (
      <View style={{...styles.container, backgroundColor: 'white'}}>
        <TouchableOpacity
        onPress={()=>navigation.navigate('ShowDeliveryNote',{ deliveryNote : record })}
        >
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{record.org_stock_code}</Text>
              <Text style={styles.description}>{record.org_stock_name}</Text>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                <Text style={{...styles.description, marginRight : 3}}>
                   Picking name : {record.picker_name}  |  
                </Text>
                
                <Text style={styles.description}>
                  Date :{'  '}
                  { record.picking_at ? 
                    dayjs(record.picking_at).format('DD-MM-YYYY') : '-'
                  }
                </Text>
              </View>
              <View style={{marginTop: 5, flexDirection: 'row'}}>
                <Text style={{...styles.description, marginRight : 3}}>
                   Packer name : {record.picker_name}  |  
                </Text>
                
                <Text style={styles.description}>
                  Date :{'  '}
                  { record.packed_at ? 
                    dayjs(record.packed_at).format('DD-MM-YYYY') : '-'
                  }
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const changeStatus = ({url = '', record : {}}) => {
    Request(
      'patch',
      url,
      {},
      {},
      [record.id],
      onSuccessChangeStatus,
      onFailedChangeStatus,
    );
  };

  const onSuccessChangeStatus = () => {
    if (_baseList.current) _baseList.current.refreshList();
  };

  const onFailedChangeStatus = (error : any) => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to change status',
    });
  };


  const renderHiddenItem = (item) => {
    const deliveryNoteState = props.route.params.deliveryNote.state;
  
    switch (deliveryNoteState) {
      case '':
        return (
          <View style={styles.hiddenItemContainer}>
            <TouchableOpacity
              onPress={() => changeStatus({ url: 'delivery-notes-item-picking', record: item })}
              style={styles.editButton}
            >
              <FontAwesomeIcon icon={faForklift} size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
        );
      // Add more cases if needed
      default:
        return null; // or handle other states
    }
  };
  


  return (
    <BaseList
      headerProps={{
        useLeftIcon: true,
        leftIcon: (
          <TouchableOpacity
            style={styles.leftIconContainer}
            onPress={() => props.navigation.toggleDrawer()}>
            <Icon name="bars" type="font-awesome-5" color="black" size={20} />
          </TouchableOpacity>
        ),
      }}
      ref={_baseList}
      itemList={itemList}
      leftOpenValue={0}
      rightOpenValue={-60}
      enableSwipe={true}
      hiddenItem={renderHiddenItem}
      useScan={false}
      title="Delivery Notes Items"
      itemKey="org_stock_code"
      urlKey="delivery-notes-item-index"
      sortSchema='org_stock_code'
      args={[oraganisation.active_organisation.id, warehouse.id , props.route.params.deliveryNote.id ]}
    />
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
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  hiddenItemText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
