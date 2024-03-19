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

function App() {
  return (
    <AppContainer>
      <PortraitApp />
    </AppContainer>
  );
}

export default App;
