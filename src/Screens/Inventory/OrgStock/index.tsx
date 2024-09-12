import React, {useCallback} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Icon} from '@rneui/base';
import BaseList from '~/Components/BaseList/IndexV2';
import {Card} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { reduxData, ItemOrgStockIndex, PropsScreens } from '~/types/types'


const OrgStocks: React.FC<PropsScreens> = props => {
  const navigation = useNavigation();
  const warehouse = useSelector((state : reduxData ) => state.warehouseReducer);
  const organisation = useSelector((state : reduxData ) => state.organisationReducer);

  const renderItem = (item : ItemOrgStockIndex , { onLongPress = ()=> null , listModeBulk = false, bulkValue = []}) => {
    return (
      <View style={{backgroundColor: '#ffffff'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Org Stock', {orgStock : item})}>
          <Card containerStyle={styles.cardStat}>
            <Text style={styles.labelStat}>{item.name}</Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
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
      useScan={false}
      title="Organisation Stock"
      itemKey="name"
      urlKey="org-stock-index"
      args={[organisation.active_organisation.id, warehouse.id]}
      itemList={renderItem}
      params={{
        ['filter[state]']: ['active', 'discontinuing'],
      }}
      enableSwipe={false}
      height={520}
      sortSchema="code"
      screenNavigation={'Location Scanner'} filterSchema={[]} prefix={''} 
      />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  leftIconContainer: {
    marginRight: 18,
  },
  notification: {
    width: 35,
    height: 35,
    padding: 5,
  },
  cardStat: {
    borderRadius: 10,
    paddingVertical: 20,
    marginTop: 10,
    marginRight: 0,
    marginLeft: 0,
    backgroundColor: '#FAFAFA',
  },
  labelStat: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default OrgStocks;
