import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {AuthContext} from '@/src/components/Context/context';
import request from '@/src/utils/Request';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {Card} from '@/src/components/ui/card';
import {Heading} from '@/src/components/ui/heading';
import {Text} from '@/src/components/ui/text';
import Description from '@/src/components/Description';
import dayjs from 'dayjs';
import globalStyles from '@/globalStyles';
import Barcode from 'react-native-barcode-svg';
import {Center} from '@/src/components/ui/center';

// Import FontAwesome icons
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faNarwhal, faPallet, faQuestionCircle, faEnvelope, faPhone, faIdCardAlt, faPlus, faMinus, faCheck, faLink, faLayerPlus } from '@/private/fa/pro-light-svg-icons'
library.add(faNarwhal, faPallet, faQuestionCircle, faIdCardAlt, faEnvelope, faPhone, faPlus, faMinus,faCheck, faLink, faLayerPlus)

const ShowFulffilmentReturn = ({navigation, route}) => {
  const {organisation, warehouse} = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const id = route.params.id;

  const getDataFromServer = async () => {
    setLoading(true);
    request({
      urlKey: "get-return",
      args: [organisation.id, warehouse.id, id],
      onSuccess: response => {
        setData(response.data);
        setLoading(false);
      },
      onFailed: error => {
        setLoading(false);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: error.detail?.message || 'Failed to fetch data',
        });
      },
    });
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

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
      label : "Customer reference",
      value : data.customer_reference || " - "
    },
    {
      label : "Type",
      value : (
       <View className="flex-row gap-3 items-center">
            <FontAwesomeIcon icon={data.type_icon.icon} color={data.type_icon.color}/>
            <Text>{data.type}</Text>
        </View>
      )
    },
    {
      label : "State",
      value : (
       <View className="flex-row gap-3 items-center">
            <FontAwesomeIcon icon={data.state_icon.icon} color={data.type_icon.color}/>
            <Text>{data.state_label}</Text>
        </View>
      )
    },
    {
      label : "Number pallets",
      value : data.number_pallets.toString() || "0"
    },
    {
      label : "Number services",
      value : data.number_services.toString() || "0"
    },
    {
      label : "Number physical goods",
      value : data.number_physical_goods.toString() || "0"
    },
    {
      label : "Dispatched at",
      value : data.dispatched_at ?  dayjs(data.dispatched_at).format('MMMM D[,] YYYY') :  'N/A'
    },
  ]

  return (
    <ScrollView style={globalStyles.container}>
    <Card>
      <Barcode value={data.reference} format="CODE128" />
      <Center>
        <Heading>{data.reference}</Heading>
      </Center>
    </Card>

    <Card className="mt-4">
      <Heading>Return Details</Heading>
      <Description schema={schema} />
    </Card>

  </ScrollView>
  );
};

export default ShowFulffilmentReturn;
