import React from 'react';
import {ReduxContainer} from '@core/redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PopupContextProvider} from '@src/business';

type Props = {
  children: any;
};
export const AppContainer = ({children}: Props) => {
  return (
    <SafeAreaProvider>
      <PopupContextProvider>
        <ReduxContainer>{children}</ReduxContainer>
      </PopupContextProvider>
    </SafeAreaProvider>
  );
};
