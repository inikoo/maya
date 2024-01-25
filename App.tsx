import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from './src/Store';
import Routes from './src/Routes';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <Provider store={Store}>
      <AutocompleteDropdownContextProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AutocompleteDropdownContextProvider>
      <FlashMessage position="top" />
    </Provider>
  );
}
