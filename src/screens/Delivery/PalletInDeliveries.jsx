import React, {useContext, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {AuthContext} from '@/src/components/Context/context';
import BaseList from '@/src/components/BaseList';
import globalStyles from '@/globalStyles';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {Button, ButtonText, ButtonSpinner} from '@/src/components/ui/button';
import {Input, InputField} from '@/src/components/ui/input';
import Modal from '@/src/components/Modal';
import request from '@/src/utils/Request';
import {useDelivery} from '@/src/components/Context/delivery';

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
  faPallet,
  faTimes,
} from '@/private/fa/pro-light-svg-icons';
import {
  faFileInvoiceDollar,
  faInventory,
  faTimes as faTimesRegular,
  faHistory,
  faSave,
} from '@/private/fa/pro-regular-svg-icons';

library.add(
  faSeedling,
  faShare,
  faSpellCheck,
  faCheck,
  faCross,
  faCheckDouble,
  faWarehouseAlt,
  faPallet,
  faTimes,
  faFileInvoiceDollar,
);

const PalletInDeliveries = ({navigation, route}) => {
  const {organisation, warehouse} = useContext(AuthContext);
  const {id} = route.params;

  return (
    <View style={globalStyles.container}>
      <BaseList
        navigation={navigation}
        urlKey="get-pallets-delivery"
        args={[organisation.id, warehouse.id, id]}
        listItem={({item, navigation}) => (
          <GroupItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const GroupItem = ({item: initialItem, navigation}) => {
  const [item, setItem] = useState(initialItem);
  const {data} = useDelivery();
  const [showModalMovePallet, setShowModalMovePallet] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const SWIPE_THRESHOLD = 60;
  const MAX_SWIPE = 100;
  const {control, handleSubmit, reset, setValue} = useForm({
    defaultValues: {
      location: '',
    },
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(
          Math.min(Math.max(gestureState.dx, -MAX_SWIPE), MAX_SWIPE),
        );
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.spring(translateX, {
            toValue: MAX_SWIPE,
            useNativeDriver: true,
          }).start();
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.spring(translateX, {
            toValue: -MAX_SWIPE,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const onNotReceived = () => {
    request({
      urlKey: 'set-pallet-not-received',
      method: 'patch',
      args: [item.id],
      data: {},
      onSuccess: response => {
        setItem(prevItem => ({
          ...prevItem,
          state: response.data.state,
          state_icon: response.data.status_icon,
        }));

        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Updated pallet ' + item.reference,
        });
      },
      onFailed: error => {
        console.log(error);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody:
            error.detail?.message ||
            'Failed to update pallet ' + item.reference,
        });
      },
    });
  };

  const onUndoNotReceived = () => {
    request({
      urlKey: 'undo-pallet-not-received',
      method: 'patch',
      args: [item.id],
      data: {},
      onSuccess: response => {
        setItem(prevItem => ({
          ...prevItem,
          state: response.data.state,
          state_icon: response.data.status_icon,
        }));

        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Updated pallet ' + item.reference,
        });
      },
      onFailed: error => {
        console.log(error);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody:
            error.detail?.message ||
            'Failed to update pallet ' + item.reference,
        });
      },
    });
  };

  const onSubmitSetLocation = formData => {
    request({
      method: 'patch',
      urlKey: 'set-pallet-location',
      args: [formData.location, item.id],
      data: formData,
      onSuccess: response => {
        setItem(prevItem => ({
          ...prevItem,
          location_code: response.data.location_code,
        }));

        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setShowModalMovePallet(false);

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Updated pallet ' + item.reference,
        });
      },
      onFailed: error => {
        setShowModalMovePallet(false);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody:
            error.detail?.message ||
            'Failed to update pallet ' + item.reference,
        });
      },
    });
  };

  return (
    <View style={{marginVertical: 5}}>
      {data.state === "booking_in" && (
        <>
          {item.state !== 'not_received' ? (
            <View
              style={[{width: MAX_SWIPE}, globalStyles.button_swipe_primary]}>
              <TouchableOpacity
                size="md"
                variant="solid"
                onPress={() => setShowModalMovePallet(true)}>
                <FontAwesomeIcon icon={faInventory} size={25} color="#615FFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={[
                globalStyles.button_swipe_danger,
                {width: MAX_SWIPE, backgroundColor: '#E5E7EB'},
              ]}>
              <TouchableOpacity
                size="md"
                variant="solid"
                onPress={onUndoNotReceived}>
                <FontAwesomeIcon icon={faHistory} size={25} />
              </TouchableOpacity>
            </View>
          )}

          {item.state !== 'not_received' && (
            <View
              style={[{width: MAX_SWIPE}, globalStyles.button_swipe_danger]}>
              <TouchableOpacity
                size="md"
                variant="solid"
                onPress={onNotReceived}>
                <FontAwesomeIcon icon={faTimesRegular} color="red" size={25} />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            transform: [{translateX}],
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          globalStyles.list.card,
        ]}>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={globalStyles.list.container}>
            <View style={globalStyles.list.avatarContainer}>
              {item?.state_icon && (
                <FontAwesomeIcon
                  icon={item.state_icon.icon}
                  size={24}
                  style={{marginVertical: 3}}
                />
              )}
              {item?.type_icon && (
                <FontAwesomeIcon
                  icon={item.type_icon.icon}
                  size={24}
                  style={{marginVertical: 3}}
                />
              )}
            </View>

            <View style={globalStyles.list.textContainer}>
              <Text style={globalStyles.list.title}>
                {item?.reference || 'No reference available'}
              </Text>
              <Text style={globalStyles.list.description}>
                {item?.customer_reference || 'No customer reference available'}
              </Text>
            </View>

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
                {item?.location_code || '-'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        isVisible={showModalMovePallet}
        title="Move Pallet"
        onClose={() => setShowModalMovePallet(false)}>
        <View className="w-full">
          <Text className="text-sm font-semibold mb-1">Location</Text>
          <Controller
            name="location"
            control={control}
            render={({field}) => (
              <Input variant="outline" size="md">
                <InputField
                  placeholder="Enter new location..."
                  value={field.value}
                  onChangeText={field.onChange}
                />
              </Input>
            )}
          />

          <Button
            size="lg"
            className="my-3"
            onPress={handleSubmit(onSubmitSetLocation)}>
            {loadingSave ? (
              <ButtonSpinner />
            ) : (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <FontAwesomeIcon icon={faSave} size={20} color="#fff" />
                <ButtonText>Move Pallet</ButtonText>
              </View>
            )}
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default PalletInDeliveries;
