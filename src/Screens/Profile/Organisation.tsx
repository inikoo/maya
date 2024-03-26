import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from '@rneui/themed'; // Assuming the icon component is imported correctly
import {UpdateCredential} from '~/Utils/auth';
import Action from '~/Store/Action';

const Organisation = props => {
  const [profileData, setProfileData] = React.useState(null);
  const user = useSelector(state => state.userReducer);
  const organisation = useSelector(state => state.organisationReducer);
  const dispatch = useDispatch();

  const renderItem = ({item}) => <Item data={item} />;

  const setOrganisation = data => {
    dispatch(
      Action.CreateUserOrganisationProperties({
        organisations: user.organisations,
        active_organisation: {
          ...data,
          active_authorised_fulfilments: data.authorised_fulfilments[0],
        },
      }),
    );
    dispatch(Action.CreateWarehouseProperties(data));
  };

  const Item = data => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setOrganisation(data.data)}>
        <View style={styles.itemContent}>
          <Text style={styles.label}>{data.data.label}</Text>
          {organisation.active_organisation.id == data.data.id && (
            <Icon
              name="check-circle"
              type="material-icons"
              color="#00FF00"
              size={20}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UpdateCredential(user.token);
        console.log('Data received:', data);
        if (data.status === 'Success') {
          setProfileData({...data.data});
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user.token]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={profileData?.organisations || []}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Organisation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 15,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});
