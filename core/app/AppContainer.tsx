import React from 'react';
import {ReduxContainer} from '@core/redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

type Props = {
  children: any;
};
export const AppContainer = ({children}: Props) => {
  return (
    <SafeAreaProvider>
      <ReduxContainer>{children}</ReduxContainer>
    </SafeAreaProvider>
  );
};
