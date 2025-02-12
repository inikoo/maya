import React, {useContext, useEffect, useState, useRef} from 'react';
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
import Barcode from 'react-native-barcode-svg';
import Timeline from 'react-native-timeline-flatlist';
import Description from '@/src/components/Description';
import Menu from '@/src/components/Menu';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useDelivery } from '@/src/components/Context/delivery';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faCheckDouble,
  faChevronDown,
  faChevronUp,
} from '@/private/fa/pro-light-svg-icons';
import {faBars} from '@/private/fa/pro-regular-svg-icons';

const ShowFulfilmentDelivery = ({navigation, route}) => {
  const {organisation, warehouse} = useContext(AuthContext);
  const { data, setData } = useDelivery();
  const [loading, setLoading] = useState(true);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const {id} = route.params;
  const insets = useSafeAreaInsets();
  const menuRef = useRef(null);

  const setStatusDelivery = state => {
    request({
      urlKey: 'set-delivery-' + state,
      method: 'patch',
      args: [data.id],
      data: {state: state},
      onSuccess: response => {
        fetchData();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'success update pallet to ' + state,
        });
      },
      onFailed: error => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: error.detail?.message || 'Failed to update data',
        });
      },
    });
  };

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

  const onPressMenu = event => {
    switch (event.event) {
      case 'received':
        setStatusDelivery(event.event);
        break;
      case 'booking-in':
        setStatusDelivery(event.event);
        break;
      case 'booked-in':
        setStatusDelivery(event.event);
        break;
      case 'cancel':
        console.log('Option 3 selected');
        break;
      default:
        console.log('Unknown option selected');
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, organisation.id, warehouse.id]);

  const getFilteredActions = () => {
    if (data?.state === 'confirmed') {
      return [
        {id: 'received', title: 'Received'},
        {id: 'cancel', title: 'Cancel', attributes: {destructive: true}},
      ];
    }

    if (data?.state === 'received') {
      return [{id: 'booking-in', title: 'Booking in'}];
    }

    if (data?.state === 'booking_in') {
      return [{id: 'booked-in', title: 'Booked in'}];
    }

    return [];
  };

  useEffect(() => {
    navigation.setOptions({
      title: data ? `Delivery ${data.reference}` : 'Delivery Details',
      headerRight: () => (
        <View className="px-4">
          <Menu
            ref={menuRef}
            onPressAction={({nativeEvent}) => onPressMenu(nativeEvent)}
            button={
              <TouchableOpacity onPress={() => menuRef?.current?.menu.show()}>
                <FontAwesomeIcon icon={faBars} />
              </TouchableOpacity>
            }
            actions={getFilteredActions()}
          />
        </View>
      ),
    });
  }, [navigation, data]);

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
    ? Object.values(data.timeline).map(event => {
        const formattedTime = dayjs(event.timestamp).isValid()
          ? dayjs(event.timestamp).format('HH:mm')
          : 'N/A';
        const formattedDate = dayjs(event.timestamp).isValid()
          ? dayjs(event.timestamp).format('YYYY-MM-DD HH:mm')
          : 'N/A';

        return {
          time: formattedTime,
          title: event.label,
          description: formattedDate,
          /*   lineColor: event.label === data.state_label ? '#66DC71' : 'gray', */
          circleColor: event.label === data.state_label ? '#66DC71' : 'gray',
        };
      })
    : [];

  const schema = [
    {
      label: 'Customer',
      value: data.customer_name,
    },
    {
      label: 'Boxes',
      value: data.number_boxes ? data.number_boxes.toString() : '-',
    },
    {
      label: 'Oversizes',
      value: data.number_oversizes ? data.number_oversizes.toString() : '-',
    },
    {
      label: 'Pallets',
      value: data.number_pallets ? data.number_pallets.toString() : '-',
    },
    {
      label: 'Services',
      value: data.number_services ? data.number_services.toString() : '-',
    },
    {
      label: 'Estimated delivery',
      value: data.estimated_delivery_date
        ? dayjs(data.estimated_delivery_date).format('MMMM D[,] YYYY')
        : 'N/A',
    },
    {
      label: 'Note',
      value: data.public_notes,
    },
  ];

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={{paddingBottom: insets.bottom + 120}}>
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
                  icon={data.state_icon.icon}
                  color={data.state_icon.color}
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
