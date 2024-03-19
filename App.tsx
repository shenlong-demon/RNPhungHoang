/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler'
import React from 'react';
import PortraitApp from '@src/screens/portrait';
import AppContainer from '@core/app';
import {AuthContextProvider} from "@src/business";

function App() {
  return (
    <AppContainer>
        <AuthContextProvider>
            <PortraitApp />
        </AuthContextProvider>
    </AppContainer>
  );
}

export default App;
