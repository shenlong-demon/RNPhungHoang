import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PopupContextProvider } from '@src/business';
import { NavigationContainer } from '@core/navigation';
import { Keyboard } from 'react-native';
import { DeviceUtility } from '@core/system/device';

type Props = {
  children: any;
};
export const AppContainer = ({ children }: Props) => {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        DeviceUtility.isKeyboardShow = true;
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        DeviceUtility.isKeyboardShow = false;
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PopupContextProvider>{children}</PopupContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
