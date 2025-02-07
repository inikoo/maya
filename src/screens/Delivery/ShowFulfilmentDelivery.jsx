import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '@/src/components/Context/context';
import request from '@/src/utils/Request';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {Card} from '@/src/components/ui/card';
import {Heading} from '@/src/components/ui/heading';
import {Center} from '@/src/components/ui/center';
import {Text} from '@/src/components/ui/text';
import dayjs from 'dayjs';
import globalStyles from '@/globalStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faCheckDouble,
  faChevronDown,
  faChevronUp,
} from '@/private/fa/pro-light-svg-icons';
import Barcode from 'react-native-barcode-svg';
import Timeline from 'react-native-timeline-flatlist';
import Description from '@/src/components/Description' 

const ShowFulfilmentDelivery = ({navigation, route}) => {
  const {organisation, warehouse} = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const {id} = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request({
          urlKey: 'get-delivery',
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

  const timelineData = data.timeline
    ? Object.values(data.timeline).map(event => ({
        time: dayjs(event.timestamp).format('HH:mm'),
        title: event.label,
        description: dayjs(event.timestamp).format('YYYY-MM-DD HH:mm'),
        lineColor : event.label == data.state_label ? '#66DC71' : "gray",
        circleColor : event.label == data.state_label ? '#66DC71' : "gray",
      }))
    : [];

    const schema = [
      {
        label : "Customer",
        value : data.customer_name
      },
      {
        label : "Boxes",
        value : data.customer_name
      },
      {
        label : "Pallets",
        value : data.customer_name
      },
      {
        label : "Estimated delivery",
        value : data.estimated_delivery_date ?  dayjs(data.estimated_delivery_date).format('MMMM D[,] YYYY') :  'N/A'
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
        <Heading>Delivery Details</Heading>
        <Description schema={schema} />
      </Card>

      <Card className={`mt-4 p-2 ${!isTimelineOpen ? 'bg-indigo-300' : ''}`}>
        <TouchableOpacity
          className={`flex-row justify-between items-center py-2 px-4`}
          onPress={() => setIsTimelineOpen(!isTimelineOpen)}>
          <View>
            {!isTimelineOpen && (
              <View className="flex-row items-center mt-2 gap-4 ">
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  color="purple"
                  size={23}
                />
                <Text className="ml-2 font-bold text-white">
                  {data.state_label}
                </Text>
              </View>
            )}
          </View>
          <FontAwesomeIcon
            icon={isTimelineOpen ? faChevronUp : faChevronDown}
            size={20}
          />
        </TouchableOpacity>
        <View className="px-4">
          {isTimelineOpen && timelineData.length > 0 && (
            <Timeline
              data={timelineData}
              lineColor="gray"
              circleColor="#66DC71"
              innerCircle={'dot'}
              isUsingFlatlist={false}
              timeStyle={{
                textAlign: 'center',
                backgroundColor: '#7C86FF',
                color: 'white',
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 13,
              }}
              descriptionStyle={{color: 'gray'}}
            />
          )}
        </View>
      </Card>
    </ScrollView>
  );
};

export default ShowFulfilmentDelivery;
