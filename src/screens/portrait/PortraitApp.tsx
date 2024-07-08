import React, {FC, memo} from 'react';
import {
  DrawerNavigator,
  NavigationContainer,
  StackNavigator,
} from '@core/navigation';
import LoginScreen from '@src/screens/portrait/auth';

import {Route} from '@src/screens/portrait/Route';
import StoreScreen from '@src/screens/portrait/main/store';
import {
  DataContextProvider,
  OperationContextProvider,
  SettingContextProvider,
  useAuthContext,
} from '@src/business';
import {
  ProductListScreen,
  UpdateProductScreen,
} from '@src/screens/portrait/main/product';
import MainScreen from '@src/screens/portrait/main';
import {UpdateBrandScreen} from '@src/screens/portrait/main/brand';
import {UpdateGroupScreen} from '@src/screens/portrait/main/group';
import {
  OperationDetailScreen,
  POSSellerScreen,
} from '@src/screens/portrait/main/pos';

type Props = {};
export const PortraitApp: FC<Props> = memo(({}) => {
  const {user} = useAuthContext();

  const operationDetail = () => {
    return <OperationDetailScreen />;
  };
  const pos = () => {
    return (
      <OperationContextProvider>
        <StackNavigator
          screens={[
            {
              name: Route.POS_SELLER,
              component: POSSellerScreen,
              options: {headerShown: false},
            },
            {
              name: Route.OPERATION_DETAIL,
              component: operationDetail,
              options: {headerShown: true},
            },
          ]}
        />
      </OperationContextProvider>
    );
  };

  const product = () => {
    return (
      <StackNavigator
        screens={[
          {
            name: Route.PRODUCT_LIST,
            component: ProductListScreen,
            options: {headerShown: false},
          },
          {
            name: Route.PRODUCT_UPDATE,
            component: UpdateProductScreen,
            options: {headerShown: false},
          },
        ]}
      />
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
              {name: Route.PRODUCT, component: product},
              {name: Route.POS_SELLER, component: pos},
              {name: Route.BRANCH, component: UpdateBrandScreen},
              {name: Route.GROUP, component: UpdateGroupScreen},
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
          !user
            ? {
                name: Route.LOGIN,
                component: LoginScreen,
                options: {headerShown: false},
              }
            : {
                name: Route.MAIN,
                component: main,
                options: {headerShown: false},
              },
        ]}
      />
    </NavigationContainer>
  );
});
