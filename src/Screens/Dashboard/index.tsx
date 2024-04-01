import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import profileImage from '../../assets/image/user-profile.jpg';
import {v4 as uuidv4} from 'uuid';
import {Avatar, Divider, Card, Icon, Text, Button} from '@rneui/base';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import {useSelector} from 'react-redux';
import LoginSVG from '../../assets/image/learning.jpg';
import SetUpOrganisation from './SetUpOrganisation';
import SetUpFullfilment from './SetUpFullfilment';

export default function HomeScreen({navigation}) {
  const warehouse = useSelector(state => state.warehouseReducer);
  const organisation = useSelector(state => state.organisationReducer);
  const user = useSelector(state => state.userReducer);

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
      title: 'Delivery',
      key: 'Delivery',
      icon: {
        name: 'truck',
        type: 'font-awesome',
        shadowPos: {top: 0, left: 10},
      },
    },
    {
      id: uuidv4(),
      title: 'Return',
      key: 'Return',
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
 /*    {
      id: uuidv4(),
      title: 'Stored Items',
      key: 'StoredItems',
      icon: {
        name: 'box',
        type: 'entypo',
        shadowPos: {top: 0, left: 24},
      },
    }, */
  ];

  const stat = [
    {
      id: uuidv4(),
      title: 'Location',
      total: 100,
    },
    {
      id: uuidv4(),
      title: 'Pallet',
      total: 100,
    },
    {
      id: uuidv4(),
      title: 'Delivery',
      total: 100,
    },
    {
      id: uuidv4(),
      title: 'Stored Items',
      total: 100,
    },
  ];

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

  const renderStat = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {stat.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onPressMenu(item)}
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
                {item.title}
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
                  Total: {item.total}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
                Hello {user.username}
              </Text>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <ImageBackground
                  source={profileImage}
                  style={{width: 35, height: 35}}
                  imageStyle={{borderRadius: 25}}
                />
              </TouchableOpacity>
            </View>

            <View
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
            </View>

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
