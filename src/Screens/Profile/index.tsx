import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {RemoveCredential} from '~/Utils/auth';
import {useDispatch, useSelector} from 'react-redux';
import Action from '~/Store/Action';
import {MAINCOLORS} from '~/Utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar} from '@rneui/themed';
import Layout from '~/Components/Layout';
import Header from '~/Components/Header';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);
  const organisation = useSelector(state => state.organisationReducer);

  const logOut = () => {
    RemoveCredential();
    dispatch(Action.DestroyUserSessionProperties());
  };

  return (
    <Layout>
      <View>
        <Header title="Setting App" />
        <Text style={styles.label}>Account</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.touchableItem}
            onPress={() => navigation.navigate('Profile Detail')}>
            <View style={styles.listItem}>
              <LinearGradient
                colors={[MAINCOLORS.primary, '#ff6f00']} // Customize gradient colors
                style={styles.avatarBackground}>
                <Avatar
                  containerStyle={styles.avatar}
                  size={24}
                  icon={{name: 'edit', type: 'material-icons'}}
                />
              </LinearGradient>
              <Text style={styles.itemLabel}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableItem}
            onPress={() => navigation.navigate('Organisation')}>
            <View style={styles.listItem}>
              <LinearGradient
                colors={[MAINCOLORS.primary, '#ff6f00']} // Customize gradient colors
                style={styles.avatarBackground}>
                <Avatar
                  size={24}
                  containerStyle={styles.avatar}
                  icon={{name: 'group', type: 'material-icons'}}
                />
              </LinearGradient>
              <Text style={styles.itemLabel}>Organisations</Text>
            </View>
          </TouchableOpacity>
          {Object.keys(organisation).length != 0 && (
            <TouchableOpacity
              style={styles.touchableItem}
              onPress={() => navigation.navigate('Fullfilment')}>
              <View style={styles.listItem}>
                <LinearGradient
                  colors={[MAINCOLORS.primary, '#ff6f00']} // Customize gradient colors
                  style={styles.avatarBackground}>
                  <Avatar
                    size={24}
                    containerStyle={styles.avatar}
                    icon={{name: 'list', type: 'material-icons'}}
                  />
                </LinearGradient>
                <Text style={styles.itemLabel}>Fulfilments</Text>
              </View>
            </TouchableOpacity>
          )}
          {Object.keys(organisation).length != 0 && (
            <TouchableOpacity
              style={styles.touchableItem}
              onPress={() => navigation.navigate('Warehouse')}>
              <View style={[styles.listItem, styles.lastItem]}>
                <LinearGradient
                  colors={[MAINCOLORS.primary, '#ff6f00']} // Customize gradient colors
                  style={styles.avatarBackground}>
                  <Avatar
                    size={24}
                    containerStyle={styles.avatar}
                    icon={{name: 'warehouse', type: 'font-awesome-5'}}
                  />
                </LinearGradient>
                <Text style={styles.itemLabel}>Warehouse</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <Text style={{...styles.label, marginTop: 20}}>Support & about</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.touchableItem}>
            <View style={styles.listItem}>
              <LinearGradient
                colors={[MAINCOLORS.primary, '#ff6f00']} // Customize gradient colors
                style={styles.avatarBackground}>
                <Avatar
                  size={24}
                  containerStyle={styles.avatar}
                  icon={{name: 'flag', type: 'font-awesome-5'}}
                />
              </LinearGradient>
              <Text style={styles.itemLabel}>Report a problem</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableItem} onPress={logOut}>
            <View style={styles.listItem}>
              <LinearGradient
                colors={[MAINCOLORS.primary, '#ff6f00']} // Customize gradient colors
                style={styles.avatarBackground}>
                <Avatar
                  size={24}
                  containerStyle={styles.avatar}
                  icon={{name: 'logout', type: 'material-community'}}
                />
              </LinearGradient>

              <Text style={styles.itemLabel}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  label: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#FAFAFA',
    padding: 10,
  },
  touchableItem: {
    borderRadius: 10,
    marginVertical: 5,
  },
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    gap: 15,
  },
  itemLabel: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
  avatarBackground: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatar: {
    borderWidth: 0,
  },
});

export default Profile;
