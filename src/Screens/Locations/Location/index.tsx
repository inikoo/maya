import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import BaseList from '~/Components/BaseList/IndexV2';
import {useNavigation} from '@react-navigation/native';
import {Text, Icon, Card} from '@rneui/themed';
import {COLORS} from '~/Utils/Colors';
import {IconColor} from '~/Utils';

const Locations = props => {
  const navigation = useNavigation();
  const organisation = useSelector(state => state.organisationReducer);
  const warehouse = useSelector(state => state.warehouseReducer);
  const [openDialog, setOpenDialog] = useState(false);

  const setDialog = () => {
    setOpenDialog(!openDialog);
  };

  const Item = record => {
    return (
      <View style={{backgroundColor: '#ffffff'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Location', {location: record})}>
          <Card containerStyle={styles.cardStat}>
            <Text style={styles.labelStat}>{record.code}</Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <BaseList
        headerProps={{
          useLeftIcon: true,
          leftIcon: (
            <TouchableOpacity
              style={styles.leftIconContainer}
              onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="bars" type="font-awesome-5" color="black" size={20} />
            </TouchableOpacity>
          ),
        }}
        title="Location"
        itemKey="code"
        urlKey="locations-index"
        args={[organisation.active_organisation.id, warehouse.id]}
        enableSwipe={false}
        sortSchema="code"
        itemList={Item}
        screenNavigation={'Location Scanner'}
      />
    </>
  );
};

export default Locations;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
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
  leftIconContainer: {
    marginRight: 18,
  },
  cardStat: {
    borderRadius: 10,
    paddingVertical: 20,
    marginTop: 10,
    marginRight: 0,
    marginLeft: 0,
    backgroundColor: '#FAFAFA',
  },
  labelStat: {
    fontSize: 14,
    fontWeight: '700',
  },
});
