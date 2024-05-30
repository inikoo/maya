import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Text, FAB} from '@rneui/themed';
import Action from '~/Store/Action';
import Empty from '~/Components/Empty';
import {MAINCOLORS} from '~/Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {UpdateCredential} from '~/Utils';

const Organisation = (props: Object) => {
  const [profileData, setProfileData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const user = useSelector((state: Object) => state.userReducer);
  const organisation = useSelector(
    (state: Object) => state.organisationReducer,
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const renderItem = ({item}) => <Item data={item} />;

  const setOrganisation = data => {
    dispatch(
      Action.CreateUserOrganisationProperties({
        organisations: user.organisations,
        active_organisation: {
          ...data,
          active_authorised_fulfilments: null,
        },
      }),
    );
    dispatch(Action.CreateWarehouseProperties(data));
  };

  const Item = (data: Object) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setOrganisation(data.data)}>
        <View style={styles.itemContent}>
          <Text style={styles.label}>{data.data.label}</Text>
          {organisation.active_organisation?.id == data.data.id && (
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
      setLoading(true);
      try {
        const data = await UpdateCredential(user.token);
        if (data.status === 'Success') {
          setProfileData({...data.data});
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user.token]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList
            data={
              profileData?.organisations
                ? profileData?.organisations.filter(
                    item => item.authorised_fulfilments.length != 0,
                  )
                : []
            }
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Empty useButton={false} />
              </View>
            )}
          />
        </View>
      )}
      {organisation.active_organisation?.id && (
        <FAB
          placement="right"
          onPress={() => navigation.navigate('Fullfilment')}
          color={MAINCOLORS.primary}>
          <Icon name="arrow-right" type="feather" color="white" />
        </FAB>
      )}
    </SafeAreaView>
  );
};

export default Organisation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
