import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DtoHandlerContextProvider, PopupContextProvider } from '@src/business';
import { NavigationContainer } from '@core/navigation';

type Props = {
  children: any;
};
export const AppContainer = ({ children }: Props) => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PopupContextProvider>
          <DtoHandlerContextProvider>{children}</DtoHandlerContextProvider>
        </PopupContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
