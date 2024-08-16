/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import PortraitApp from '@src/screens/portrait';
import AppContainer from '@core/app';
import { AuthContextProvider, DtoHandlerContextProvider } from '@src/business';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

function App() {
  return (
    <AppContainer>
      <AuthContextProvider>
        <DtoHandlerContextProvider>
          <PortraitApp />
        </DtoHandlerContextProvider>
      </AuthContextProvider>
    </AppContainer>
  );
}

export default App;
