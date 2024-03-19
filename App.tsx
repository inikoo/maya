import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from './src/Store';
import Routes from './config/Routes';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';

export default function App() {
  return (
    <Provider store={Store}>
      <AlertNotificationRoot>
        <AutocompleteDropdownContextProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </AutocompleteDropdownContextProvider>
      </AlertNotificationRoot>
    </Provider>
  );
}
