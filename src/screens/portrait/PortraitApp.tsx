import React, {FC, memo} from 'react';
import {DrawerNavigator, StackNavigator} from '@core/navigation';
import LoginScreen from '@src/screens/portrait/auth';

import {Route} from '@src/screens/portrait/Route';
import StoreScreen from '@src/screens/portrait/main/store';
import {
  DataContextProvider,
  OperationContextProvider,
  OperationListContextProvider,
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
import {CustomerListScreen} from '@src/screens/portrait/main/customer/CustomerListScreen';
import {UpdateCustomerScreen} from '@src/screens/portrait/main/customer/UpdateCustomerScreen';
import {MenuScreen} from '@src/screens/portrait/main/pos/menu';
import {AssignCustomerScreen} from '@src/screens/portrait/main/pos/assign_csutomer';

type Props = {};
export const PortraitApp: FC<Props> = memo(({}) => {
  const {user} = useAuthContext();

  const OperationDetail = () => {
    return (
      <StackNavigator
        screens={[
          {
            name: Route.OPERATION_DETAIL,
            component: OperationDetailScreen,
            options: {headerShown: true},
          },
          {
            name: Route.MENU_SCREEN,
            component: MenuScreen,
            options: {headerShown: true},
          },
        ]}
      />
    );
  };
  const POSStack = () => {
    return (
      <OperationListContextProvider>
        <OperationContextProvider>
          <StackNavigator
            screens={[
              {
                name: Route.OPERATION_LIST,
                component: POSSellerScreen,
              },
              {
                name: Route.OPERATION_DETAIL,
                component: OperationDetailScreen,
                options: {headerShown: true},
              },
              {
                name: Route.MENU_SCREEN,
                component: MenuScreen,
                options: {headerShown: true},
              },
              {
                name: Route.ASSIGN_CUSTOMER,
                component: AssignCustomerScreen,
                options: {headerShown: true},
              },
            ]}
          />
        </OperationContextProvider>
      </OperationListContextProvider>
    );
  };

  const ProductStack = () => {
    return (
      <StackNavigator
        screens={[
          {
            name: Route.PRODUCT_LIST,
            component: ProductListScreen,
            options: {headerShown: true},
          },
          {
            name: Route.PRODUCT_UPDATE,
            component: UpdateProductScreen,
            options: {headerShown: true},
          },
        ]}
      />
    );
  };
  const CustomerStack = () => {
    return (
      <StackNavigator
        screens={[
          {
            name: Route.CUSTOMER_LIST,
            component: CustomerListScreen,
            options: {headerShown: true},
          },
          {
            name: Route.CUSTOMER_UPDATE,
            component: UpdateCustomerScreen,
            options: {headerShown: true},
          },
        ]}
      />
    );
  };
  const MainStack = () => {
    return (
      <SettingContextProvider>
        <DataContextProvider>
          <>
            <DrawerNavigator
              screens={[
                {name: Route.MAIN, component: MainScreen},
                {name: Route.STORE, component: StoreScreen},
                {name: Route.PRODUCT, component: ProductStack},
                {
                  name: Route.POS_SELLER,
                  component: POSStack,
                  options: {headerShown: true},
                },
                {name: Route.BRANCH, component: UpdateBrandScreen},
                {name: Route.GROUP, component: UpdateGroupScreen},
                {name: Route.CUSTOMER, component: CustomerStack},
              ]}
            />
            {/*<Button.FloatCircle*/}
            {/*  style={{*/}
            {/*    position: 'absolute',*/}
            {/*    alignSelf: 'center',*/}
            {/*    bottom: 0,*/}
            {/*    justifyContent: 'flex-end',*/}
            {/*  }}*/}
            {/*  onPress={() => {}}*/}
            {/*/>*/}
          </>
        </DataContextProvider>
      </SettingContextProvider>
    );
  };

  return (
    <StackNavigator
      screens={[
        !user
          ? {
              name: Route.LOGIN,
              component: LoginScreen,
              options: {headerShown: false},
            }
          : {
              name: Route.APP,
              component: MainStack,
              options: {headerShown: false},
            },
      ]}
    />
  );
});
