import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList';
import {useNavigation} from '@react-navigation/native';
import {Text, Avatar} from '@rneui/themed';
import {COLORS, MAINCOLORS} from '~/Utils/Colors';
import { Request } from '~/Utils';

const Notifications = props => {
  const navigation = useNavigation();
  const [openDialog, setOpenDialog] = useState(false);


  const readNotification = (data)=>{
    Request(
      'patch',
      'notification-read',
      {},
      {},
      [data.id],
      ()=>NavigationPush(data.data),
      ()=>NavigationPush(data.data),
    );
  }


  const NavigationPush=(data)=>{
    if(data.type == "PalletDelivery")navigation.navigate('Delivery',{delivery : {id : data.id}})
    else if(data.type == "PalletReturn")navigation.navigate('Return',{return : {id : data.id}})
    else if(data.type == "Pallet")navigation.navigate('Pallet',{pallet : {id : data.id}})
  }

  const Item = ({item}) => {
    return (
      <TouchableOpacity style={styles.container} onPress={()=>readNotification(item)}>
        <View style={styles.row}>
          <Avatar
            size={40}
            icon={item.read_at ? {name: 'envelope-open', type: 'font-awesome'} :  {name: 'envelope', type: 'font-awesome'}}
            containerStyle={{backgroundColor: !item.read_at  ? MAINCOLORS.primary : COLORS.grey7 , marginRight : 10}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.data.title}</Text>
            <Text style={styles.body}>{item.data.body}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <BaseList
        urlKey="notification"
        renderItem={Item}
        navigation={props.navigation}
        title="Notification"
        settingButton={false}
      />
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    padding: 17,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    margin: 5,
    borderWidth: 1,
    borderColor: COLORS.grey6,
  },
  title: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  body: {
    fontSize: 12,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: COLORS.grey4
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    marginHorizontal: 5,
  },
});
