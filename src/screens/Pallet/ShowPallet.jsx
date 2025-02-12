import React, {useContext, useEffect, useState, useRef} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {AuthContext} from '@/src/components/Context/context';
import request from '@/src/utils/Request';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {Button, ButtonText, ButtonSpinner} from '@/src/components/ui/button';
import {Card} from '@/src/components/ui/card';
import {Heading} from '@/src/components/ui/heading';
import {Center} from '@/src/components/ui/center';
import {Text} from '@/src/components/ui/text';
import globalStyles from '@/globalStyles';
import Barcode from 'react-native-barcode-svg';
import Description from '@/src/components/Description';
import Modal from '@/src/components/Modal';
import {Textarea, TextareaInput} from '@/src/components/ui/textarea';
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from '@/src/components/ui/radio';
import {Input, InputField} from '@/src/components/ui/input';
import {CircleIcon} from '@/src/components/ui/icon';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faFragile, faSave} from '@/private/fa/pro-light-svg-icons';


library.add(faFragile);

const ShowPallet = ({navigation, route}) => {
  const {organisation, warehouse} = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModalDamaged, setShowModalDamaged] = useState(false);
  const [showModalMovePallet, setShowModalMovePallet] = useState(false);
   const menuRef = useRef(null);
  /*   const [location, setLocation] = useState(''); */
  const {id} = route.params;

  const {control, handleSubmit, reset, setValue} = useForm({
    defaultValues: {
      status: '',
      notes: '',
      location: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request({
          urlKey: 'get-pallet',
          args: [organisation.id, warehouse.id, id],
        });
        setData(response.data);
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: error.detail?.message || 'Failed to fetch data',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, organisation.id, warehouse.id]);

  const onSubmitSetDamaged = async formData => {
    console.log(formData);
  };


  /* const getFilteredActions = () => {  
    if (data?.state === 'received') {
      return  [
        { id: 'booked-in', title: 'Booked in' },
        { id: 'not-received', title: 'Not Received' },
      ];
    }
  
    if (data?.state === 'received') {
      return [
        { id: 'booking-in', title: 'Booking in' },
      ];
    }

    if (data?.state === 'booking-in') {
      return [
        { id: 'booked-in', title: 'Booked in' },
      ];
    }
  
    return []; 
  }; */

  useEffect(() => {
    navigation.setOptions({
      title: data ? `Delivery ${data.reference}` : 'Delivery Details',
      headerRight: () => (
        <View className="px-4">
         {/*  <Menu
            ref={menuRef}
            onPressAction={({ nativeEvent })=>onPressMenu(nativeEvent)}
            button={
              <TouchableOpacity onPress={() => menuRef?.current?.menu.show()}>
                <FontAwesomeIcon icon={faBars} />
              </TouchableOpacity>
            }
            actions={getFilteredActions()}
          /> */}
        </View>
      ),
    });
  }, [navigation, data]);


  const onSubmitSetLocation = formData => {
    request({
      method:'patch',
      url: 'set-pallet-location',
      args : [data.id],
      data:{
        location : formData.location
      },
      onSuccess : (e) => console.log(e),
      onFailed : (e) =>  console.log(e),
    })
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-lg text-gray-600">No Data Available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Card>
        <Center>
          <Barcode
            value={data.reference}
            format="CODE128"
            maxWidth={250}
            height={60}
          />
        </Center>
        <Center>
          <Heading>{data.reference}</Heading>
        </Center>
      </Card>

      <Card className="mt-4">
        <Heading>Delivery Details</Heading>
        <Description
          schema={[
            {label: 'Customer', value: data.customer.name},
            {label: 'Customer Reference', value: data.customer_reference},
            {label: 'Location', value: data?.location?.resource?.code || '-'},
            {label: 'State', value: data.state},
            {
              label: 'Status',
              value: (
                <View className="flex-row gap-3 items-center">
                  <FontAwesomeIcon icon={data.status_icon.icon} />
                  <Text>{data.status}</Text>
                </View>
              ),
            },
            {label: 'Notes', value: data.notes},
          ]}
        />
      </Card>

      <View className="py-4 gap-3">
        <Button
          size="lg"
          action="secondary"
          onPress={() => setShowModalMovePallet(true)}>
          <ButtonText>Move Pallet</ButtonText>
        </Button>
        <Button
          size="lg"
          variant="outline"
          action="negative"
          onPress={() => setShowModalDamaged(true)}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <FontAwesomeIcon icon={faFragile} size={20} color="#ef4444" />
            <ButtonText style={{color: '#ef4444'}}>Set as Damaged</ButtonText>
          </View>
        </Button>
      </View>

      <Modal
        isVisible={showModalDamaged}
        title="Set Damaged"
        onClose={() => setShowModalDamaged(false)}>
        <View className="w-full">
          <Text className="text-sm font-semibold mb-1">Status</Text>
          <Controller
            name="status"
            control={control}
            render={({field}) => (
              <RadioGroup
                value={field.value}
                onChange={field.onChange}
                className="my-2">
                <View className="flex-row gap-4">
                  <Radio value="damaged">
                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Damaged</RadioLabel>
                  </Radio>

                  <Radio value="lost">
                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Lost</RadioLabel>
                  </Radio>
                </View>
              </RadioGroup>
            )}
          />

          <Text className="text-sm font-semibold mt-4 mb-1">Notes</Text>
          <Controller
            name="notes"
            control={control}
            render={({field}) => (
              <Textarea className="my-2">
                <TextareaInput
                  placeholder="Additional notes..."
                  value={field.value}
                  onChangeText={field.onChange}
                />
              </Textarea>
            )}
          />

          <Button size="lg" onPress={handleSubmit(onSubmitSetDamaged)}>
            {loadingSave ? (
              <ButtonSpinner />
            ) : (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <FontAwesomeIcon icon={faSave} size={20} color="#fff" />
                <ButtonText>Save</ButtonText>
              </View>
            )}
          </Button>
        </View>
      </Modal>

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
    </ScrollView>
  );
};

export default ShowPallet;
