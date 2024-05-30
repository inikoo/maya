import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {v4 as uuidv4} from 'uuid';
import {Avatar, Divider, Card, Icon, Text, Badge} from '@rneui/themed';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {useSelector} from 'react-redux';
import SetUpOrganisation from './SetUpOrganisation';
import SetUpFullfilment from './SetUpFullfilment';
import {Request} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {get} from 'lodash';

export default function HomeScreen({navigation}) {
  const warehouse = useSelector(state => state.warehouseReducer);
  const organisation = useSelector(state => state.organisationReducer);
  const user = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [countData, setCountData] = useState([]);
  const [notification, setNotification] = useState([]);

  const Bluprint = [
    /* {
      id: uuidv4(),
      title: 'Warehouse',
      key: 'Warehouse',
      icon: {
        name: 'warehouse',
        type: 'material-icons',
        shadowPos: {top: 6, left: 23},
      },
    }, */
    {
      id: uuidv4(),
      title: 'Deliveries',
      key: 'Deliveries',
      icon: {
        name: 'truck',
        type: 'font-awesome',
        shadowPos: {top: 0, left: 10},
      },
    },
    {
      id: uuidv4(),
      title: 'Returns',
      key: 'Returns',
      icon: {
        name: 'trolley',
        type: 'material-icons',
        shadowPos: {top: 0, left: 10},
      },
    },
    {
      id: uuidv4(),
      title: 'Locations',
      key: 'Locations',
      icon: {
        name: 'location-pin',
        type: 'material-icons',
        shadowPos: {top: 0, left: 15},
      },
    },
    {
      id: uuidv4(),
      title: 'Pallets',
      key: 'Pallets',
      icon: {
        name: 'pallet',
        type: 'material-icons',
        shadowPos: {top: 0, left: 10},
      },
    },
    {
      id: uuidv4(),
      title: 'Stored Items',
      key: 'StoredItems',
      icon: {
        name: 'box',
        type: 'entypo',
        shadowPos: {top: 0, left: 24},
      },
    },
  ];

  const reqCountData = () => {
    if (organisation.active_organisation && warehouse.id) {
      setLoading(true);
      Request(
        'get',
        'warehouse-count-data',
        {},
        {},
        [organisation.active_organisation.id,warehouse.id],
        onSuccessGetCount,
        onFailedGetCount,
      );
    }
  };

  const onSuccessGetCount = (response:Object) => {
    setCountData(response.data.stats);
    setLoading(false);
  };

  const onFailedGetCount = (error:Object) => {
    setLoading(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: error.response.data.message,
    });
  };

  const getNotification = () => {
    if (organisation.active_organisation && warehouse.id) {
      setLoading(true);
      Request(
        'get',
        'notification',
        {},
        {[`notifications_filter[filter]`]: 'unread'},
        [],
        res => setNotification(res.data),
        res => {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: get(
              res,
              ['response', 'data', 'message'],
              'failed to get notification',
            ),
          });
        },
      );
    }
  };

  const onPressMenu = item => {
    navigation.navigate(item.key);
  };

  const renderMenu = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {Bluprint.map((item, index) => (
          <TouchableOpacity key={item.id} onPress={() => onPressMenu(item)}>
            <View style={{alignItems: 'center', margin: 10}}>
              <Avatar
                size={50}
                icon={{name: item.icon.name, type: item.icon.type}}
                containerStyle={{
                  backgroundColor: MAINCOLORS.primary,
                  borderRadius: 20,
                  padding: 5,
                }}
                iconStyle={{fontSize: 30}}
              />
              <Text style={{padding: 5, fontSize: 11}}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const onPressMenuStat = item => {
    if(item.label == 'Location') navigation.navigate('Locations');
    if(item.label == 'Stored Items') navigation.navigate('StoredItems');
    if(item.label == 'Delivery') navigation.navigate('Deliveries');
    if(item.label == 'Return') navigation.navigate('Returns');
    if(item.label == 'Pallets') navigation.navigate('Pallets');
  /*   navigation.navigate(item.label); */
  };

  const renderStat = () => {
    return !loading ? (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {Object.entries(countData).map(([key, item]) => (
          <TouchableOpacity
            key={key}
            onPress={() => onPressMenuStat(item)}
            style={{width: '50%', padding: 5}}>
            <Card
              containerStyle={{
                borderRadius: 10,
                paddingTop: 10,
                marginTop: 10,
                marginRight: 0,
                marginLeft: 0,
              }}>
              <Text style={{fontSize: 14, marginBottom: 5, fontWeight: '700'}}>
                {item.label}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="tags"
                  type="antdesign"
                  size={15}
                  color={MAINCOLORS.danger}
                  style={{marginRight: 5}}
                />
                <Text style={{fontSize: 12, color: '#444'}}>
                  Total: {item.count}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    ) : (
      <ActivityIndicator size="large" />
    );
  };

  useEffect(() => {
    reqCountData();
    getNotification();
  }, [organisation, warehouse]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 10}}>
        {Object.keys(organisation).length != 0 &&
        organisation.active_organisation.active_authorised_fulfilments ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
                Hello, {user.username}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Notification')}>
                  <View>
                    <Icon
                      name="notifications-outline"
                      type="ionicon"
                      style={{
                        width: 35,
                        height: 35,
                        padding: 5,
                        marginRight: 15,
                      }}
                    />
                    <Badge
                      status="primary"
                      value={notification.length}
                      containerStyle={{position: 'absolute', top: 0, left: 18}}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                  <ImageBackground
                    source={require('../../assets/image/user-profile.jpg')}
                    style={{width: 35, height: 35}}
                    imageStyle={{borderRadius: 25}}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('Scan')}     
              style={{
                flexDirection: 'row',
                borderColor: '#C6C6C6',
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 8,
                backgroundColor: MAINCOLORS.white,
              }}>
              <Feather
                name="search"
                size={20}
                color="#C6C6C6"
                style={{marginRight: 5, paddingVertical: 4}}
              />
              <TextInput
                placeholder="Search"
                style={{padding: 0, margin: 0, marginLeft: 8}}
              />
            </TouchableOpacity>

            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Roboto-Medium',
                  paddingHorizontal: 10,
                }}>
                Menu
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>{renderMenu()}</View>
            <Divider />
            <View style={{alignItems: 'center'}}>{renderStat()}</View>
          </View>
        ) : Object.keys(organisation).length == 0 ? (
          <SetUpOrganisation />
        ) : (
          <SetUpFullfilment />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
