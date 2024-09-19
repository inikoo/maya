import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions, // Import Dimensions
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Text, FAB} from '@rneui/themed';
import Action from '~/Store/Action';
import Empty from '~/Components/Empty';
import {MAINCOLORS} from '~/Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {UpdateCredential} from '~/Utils';
import Header from '~/Components/Header';

// Get the device's height for dynamic sizing
const {height} = Dimensions.get('window');

// Organisation Component
const Organisation = () => {
  const [profileData, setProfileData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const user = useSelector(state => state.userReducer);
  const organisation = useSelector(state => state.organisationReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const Item = ({data}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => setOrganisation(data)}>
      <View style={styles.itemContent}>
        <Text
          style={{
            ...styles.label,
            fontWeight:
              organisation.active_organisation?.id === data.id ? '700' : '500',
          }}>
          {data.label}
        </Text>
        {organisation.active_organisation?.id === data.id && (
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

  const renderItem = ({item}) => <Item data={item} />;

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await UpdateCredential(user.token);
        if (data.status === 'Success') {
          setProfileData({...data.data});
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.token]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContent}>
        <Header title="Organisations" />
        {loading ? (
          <ActivityIndicator
            size="large"
            color={MAINCOLORS.primary}
            style={{alignItems: 'center', flex: 1}}
          />
        ) : (
          <View>
            <FlatList
              data={
                profileData?.organisations
                  ? profileData.organisations.filter(
                      item => item.authorised_fulfilments.length !== 0,
                    )
                  : []
              }
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
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
            color={MAINCOLORS.primary}
            icon={<Icon name="arrow-right" type="feather" color="white" />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Organisation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  itemContainer: {
    height: height / 10, 
    marginVertical: 8,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});
