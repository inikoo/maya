import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Provider } from "react-redux";
import { Store } from "./src/Store";
import Routes from './src/Routes';

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  )
}
