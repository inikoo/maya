import { DashboardFullfilment, GlobalSearch, Profile } from '~/Screens';
import {Icon} from '@rneui/base';
import ScanButton from '~/Components/MainNavigatorButton';
import {View, Text} from 'react-native';

const navigation = [
    {
      name: 'DashboardFullfilment',
      options: { headerShown: false },
      components: [
        {
          name: 'Home',
          component: DashboardFullfilment,
          options: {
            headerShown: false,
            tabBarIcon: ({color}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 3,
                }}>
                <Icon name="home" type="foundation" color={color} size={25} />
                <Text style={{color: color, fontSize: 12}}>Home</Text>
              </View>
            ),
          },
        },
        {
          name: 'Scan',
          component: GlobalSearch,
          options: {
            tabBarLabel: '',
            headerShown: false,
            tabBarIcon: () => (
              <Icon name="qr-code-scanner" color="#ffffff" size={30} />
            ),
            tabBarButton: (props) => <ScanButton {...props} />,
          },
        },
        {
          name: 'Profile',
          component: Profile,
          options: {
            headerShown: false,
            tabBarIcon: ({color}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 3,
                }}>
                <Icon
                  name="user"
                  type="font-awesome"
                  color={color}
                  size={26}
                />
                <Text style={{color: color, fontSize: 12}}>Profile</Text>
              </View>
            ),
          },
        },
      ],
    },
  ]

export { navigation };
