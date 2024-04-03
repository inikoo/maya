import * as React from 'react';
import {NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from './src/Store';
import Routes from './config/Routes';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import 'react-native-get-random-values'
import {COLORS,MAINCOLORS} from '~/Utils/Colors';
import { ThemeProvider } from '@rneui/themed';
import { theme } from '~/Components/Theme';
const MyTheme = {
  dark: true,
  colors: {
    primary: MAINCOLORS.primary,
    background: MAINCOLORS.background,
    card: MAINCOLORS.primary,
    text: MAINCOLORS.black,
    border: MAINCOLORS.black,
    notification: COLORS.grey6,
  },
};

export default function App() {
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
