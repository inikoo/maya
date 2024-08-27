import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Text, Icon} from '@rneui/themed'; // Import Icon from your icon library
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import PalletCard from '~/Components/palletComponents/ListCardReturn';
import {Request, IconColor} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import AbsoluteButton from '~/Components/absoluteButton';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSeedling,
  faShare,
  faCheck,
  faTimes,
  faCheckDouble,
  faSpellCheck,
  faPallet,
  faNarwhal,
  faTruck,
  faUndoAlt
} from 'assets/fa/pro-light-svg-icons';

library.add(
  faSeedling,
  faShare,
  faSpellCheck,
  faCheck,
  faTimes,
  faCheckDouble,
  faTruck,
  faPallet,
  faNarwhal,
  faUndoAlt
);

const PalletinReturns = props => {
  const navigation = useNavigation();
  const oraganisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const returnData = props.route.params.return;
  const _baseList = useRef(null)
  const [loadingPrimary, setLoadingPrimary] = useState(false);


  const changeStatus = ({url = ''}) => {
    setLoadingPrimary(true);
    Request(
      'patch',
      url,
      {},
      {},
      [returnData.id],
      onSuccessChangeStatus,
      onFailedChangeStatus,
    );
  };

  const onSuccessChangeStatus = res => {
    if(_baseList.current) _baseList.current.refreshList()
    setLoadingPrimary(false);
  };

  const onFailedChangeStatus = error => {
    setLoadingPrimary(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message || 'failed to change status',
    });
  };

  const renderHiddenItem = item => {
    return (
      <View style={styles.hiddenItemContainer}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <TouchableOpacity
            style={styles.dangerButton}>
            <FontAwesomeIcon icon={faTimes} size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
           
            style={styles.editButton}>
            <FontAwesomeIcon icon={faCheck} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  useEffect(() => {
    if (!returnData) navigation.goBack();
  }, []);

  return (
    <>
      <BaseList
        ref={_baseList}
        headerProps={{
          useLeftIcon: true,
        }}
        title={`Pallet in ${returnData.reference}`}
        itemKey="id"
        urlKey="return-pallet-index"
        args={[
          oraganisation.active_organisation.id,
          warehouse.id,
          returnData.id,
        ]}
        hiddenItem={renderHiddenItem}
        rightOpenValue={-120}
        leftOpenValue={0}
        enableSwipe={returnData.state == 'picking' ? true : false}
        sortSchema="reference"
        screenNavigation={'Pallet Scanner'}
        itemList={(
          record,
          {onLongPress = () => null, listModeBulk = false, bulkValue = []},
        ) => (
          <PalletCard
            data={{
              record: record,
              onLongPress,
              listModeBulk,
              bulkValue,
            }}
          />
        )}
      />

      {returnData?.state == 'confirmed' && (
        <View>
          <AbsoluteButton
            loading={loadingPrimary}
            onPress={() => changeStatus({url: 'retrun-status-picking'})}
            content={
              <View>
                <FontAwesomeIcon icon={faTruck} size={30} color={'white'} />
                <Text style={{color: 'white', fontSize: 10}}>Picking</Text>
              </View>
            }
          />
        </View>
      )}

      {returnData?.state == 'picking' && (
        <View>
          <AbsoluteButton
            loading={loadingPrimary}
            onPress={() => changeStatus({url: 'return-status-picked'})}
            content={
              <View>
                <FontAwesomeIcon icon={faCheck} size={30} color={'white'} />
                <Text style={{color: 'white', fontSize: 10}}>Picked</Text>
              </View>
            }
          />
        </View>
      )}
      {returnData?.state == 'picked' && (
        <View>
          <AbsoluteButton
            loading={loadingPrimary}
            onPress={() => changeStatus({url: 'retrun-status-dispatch'})}
            content={
              <View>
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  size={30}
                  color={'white'}
                />
                <Text style={{color: 'white', fontSize: 10}}>Dispatched</Text>
              </View>
            }
          />
        </View>
      )}
    </>
  );
};

export default PalletinReturns;

const styles = StyleSheet.create({
  container: {
    padding: 17,
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
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  description: {
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hiddenItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
    alignContent: 'center',
    borderRadius: 10,
    marginVertical: 5,
    gap: 5,
  },
  editButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  dangerButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});
