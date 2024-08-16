import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PopupContextProvider } from '@src/business';
import { NavigationContainer } from '@core/navigation';

type Props = {
  children: any;
};
export const AppContainer = ({ children }: Props) => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PopupContextProvider>{children}</PopupContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
