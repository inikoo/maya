import React, {useContext} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {AuthContext} from '@/src/components/Context/context';
import BaseList from '@/src/components/BaseList';
import globalStyles from '@/globalStyles';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faSeedling,
  faShare,
  faSpellCheck,
  faCheck,
  faCross,
  faCheckDouble,
  faWarehouseAlt,
} from '@/private/fa/pro-light-svg-icons';
import {faInventory} from '@/private/fa/pro-regular-svg-icons';
library.add(
  faSeedling,
  faShare,
  faSpellCheck,
  faCheck,
  faCross,
  faCheckDouble,
  faWarehouseAlt,
);

const Pallet = ({navigation}) => {
  const {organisation, warehouse} = useContext(AuthContext);

  return (
    <View style={globalStyles.container}>
      <BaseList
        navigation={navigation}
        urlKey="get-pallets"
        args={[organisation.id, warehouse.id]}
        listItem={({item, navigation}) => (
          <GroupItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const GroupItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={[
        globalStyles.list.card,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        },
      ]}
      activeOpacity={0.7}
      onPress={() => navigation?.navigate('show-pallet', {id : item.id })}>
      <View style={globalStyles.list.container}>
        <View style={globalStyles.list.avatarContainer}>
          {item?.state_icon && (
            <FontAwesomeIcon
              icon={item.state_icon.icon}
              color={item.state_icon.color}
              size={24}
              style={{marginVertical: 3}}
            />
          )}
          {item?.type_icon && (
            <FontAwesomeIcon
              icon={item.status_icon.icon}
              color={item.status_icon.color}
              size={24}
              style={{marginVertical: 3}}
            />
          )}
        </View>

        {/* Text Section */}
        <View style={globalStyles.list.textContainer}>
          <Text style={globalStyles.list.title}>
            {item?.reference || 'No reference available'}
          </Text>
          <Text style={globalStyles.list.description}>
            {item?.customer_reference || 'No customer reference available'}
          </Text>
        </View>
        {/* Text Section */}
        <View
          style={{
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <FontAwesomeIcon
            icon={faInventory}
            size={20}
            style={{marginRight: 5}}
          />
          <Text style={{fontWeight: 'bold'}}>
            {item?.location_code || 'N/A'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Pallet;
