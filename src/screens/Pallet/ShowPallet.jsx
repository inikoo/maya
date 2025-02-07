import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {AuthContext} from '@/src/components/Context/context';
import request from '@/src/utils/Request';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {Button} from '@/src/components/ui/button';
import {Card} from '@/src/components/ui/card';
import {Heading} from '@/src/components/ui/heading';
import {Center} from '@/src/components/ui/center';
import {Text} from '@/src/components/ui/text';
import globalStyles from '@/globalStyles';
import Barcode from 'react-native-barcode-svg';
import Description from '@/src/components/Description';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';

import {
  faArrowAltFromLeft,
  faAlignJustify,
  faWarehouseAlt,
  faSeedling,
  faSadCry,
} from '@/private/fa/pro-light-svg-icons';
library.add(
  faArrowAltFromLeft,
  faAlignJustify,
  faWarehouseAlt,
  faSeedling,
  faSadCry,
);

const ShowPallet = ({navigation, route}) => {
  const {organisation, warehouse} = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request({
          urlKey: 'get-pallet',
          args: [organisation.id, warehouse.id, id],
        });
        setData(response.data);
        console.log(response,id);
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

  const schema = [
    {
      label: 'Customer',
      value: data.customer.name,
    },
    {
      label: 'Customer Reference',
      value: data.customer_reference,
    },
    {
      label: 'Location',
      value: data?.location?.resource?.code || "-",
    },
    {
      label: 'State',
      value: data.state,
    },
    {
      label: 'Status',
      value: (
        <View className="flex-row gap-3 items-center">
          <FontAwesomeIcon icon={data.status_icon.icon} />
          <Text>{data.status}</Text>
        </View>
      ),
    },
    {
      label: 'Notes',
      value: data.notes,
    },
  ];

  return (
    <ScrollView style={globalStyles.container}>
      <Card>
        <Barcode value={data.reference} format="CODE128" />
        <Center>
          <Heading>{data.reference}</Heading>
        </Center>
      </Card>

      <Card className="mt-4">
        <Heading>Delivery Details</Heading>
        <Description schema={schema} />
      </Card>
    </ScrollView>
  );
};

export default ShowPallet;
