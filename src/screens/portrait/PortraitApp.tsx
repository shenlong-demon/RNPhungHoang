import React, {FC, memo} from 'react';
import {DrawerNavigator, NavigationContainer, StackNavigator,} from '@core/navigation';
import LoginScreen from '@src/screens/portrait/auth';
import MainScreen, {UpdateBrandScreen} from '@src/screens/portrait/main';
import {Route} from '@src/screens/portrait/Route';
import StoreScreen from '@src/screens/portrait/main/store';
import POSSellerScreen from '@src/screens/portrait/main/pos';
import {DataContextProvider} from '@src/screens/business/context_providers';

type Props = {};
export const PortraitApp: FC<Props> = memo(({}) => {

    const operation = () => {
        return (
            <DataContextProvider>
                <StackNavigator screens={[
                    {name: Route.POS_SELLER, component: POSSellerScreen},
                ]}/>
            </DataContextProvider>
        );
    };
  const main = () => {
    return (
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
    );
  };

  return (
    <NavigationContainer>
      <StackNavigator
        screens={[
          {
            name: Route.LOGIN,
            component: LoginScreen,
            options: {headerShown: false},
          },
          {name: Route.MAIN, component: main, options: {headerShown: false}},
        ]}
      />
    </NavigationContainer>
  );
});
