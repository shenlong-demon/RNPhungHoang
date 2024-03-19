import React, {FC, memo} from 'react';
import {DrawerNavigator, NavigationContainer, StackNavigator,} from '@core/navigation';
import LoginScreen from '@src/screens/portrait/auth';
import MainScreen, {UpdateBrandScreen} from '@src/screens/portrait/main';
import {Route} from '@src/screens/portrait/Route';
import StoreScreen from '@src/screens/portrait/main/store';
import POSSellerScreen from '@src/screens/portrait/main/pos';
import {DataContextProvider, SettingContextProvider, useAuthContext} from "@src/business";

type Props = {};
export const PortraitApp: FC<Props> = memo(({}) => {

    const {user} = useAuthContext();
    const operation = () => {
        return (
            <DataContextProvider>
                <StackNavigator screens={[
                    {name: Route.POS_SELLER, component: POSSellerScreen,  options: {headerShown: false}},
                ]}/>
            </DataContextProvider>
        );
    };
  const main = () => {
      return (
          <SettingContextProvider>
              <DataContextProvider>
                  <DrawerNavigator
                      screens={[
                          {name: Route.MAIN, component: MainScreen},
                          {name: Route.STORE, component: StoreScreen},
                          {name: Route.POS_SELLER, component: operation},
                          {name: Route.BRANCH, component: UpdateBrandScreen},
                      ]}
                  />
              </DataContextProvider>
          </SettingContextProvider>
      );
  };

  return (
    <NavigationContainer>
      <StackNavigator
        screens={[
          !user ? {
            name: Route.LOGIN,
            component: LoginScreen,
            options: {headerShown: false},
          }:
          {name: Route.MAIN, component: main, options: {headerShown: false}},
        ]}
      />
    </NavigationContainer>
  );
});
