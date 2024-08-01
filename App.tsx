import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from './src/Store';
import Routes from './config/Routes';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import 'react-native-get-random-values';
import { COLORS, MAINCOLORS } from '~/Utils/Colors';
import {ThemeProvider} from '@rneui/themed';
import {theme} from '~/Components/Theme';
/* import messaging from '@react-native-firebase/messaging'; */

const MyTheme = {
  dark: true,
  colors: {
    primary: MAINCOLORS.primary,
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: 'rgba(0, 0, 0, 1)',
    notification: COLORS.grey6,
  },
};

export default function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  React.useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <Provider store={Store}>
      <AlertNotificationRoot>
        <AutocompleteDropdownContextProvider>
          <ThemeProvider theme={theme}>
            <NavigationContainer theme={MyTheme}>
              <Routes />
            </NavigationContainer>
          </ThemeProvider>
        </AutocompleteDropdownContextProvider>
      </AlertNotificationRoot>
    </Provider>
  );
}
