import React, { FC, memo } from 'react';
import { DrawerNavigator, StackNavigator } from '@core/navigation';
import LoginScreen from '@src/screens/portrait/auth';

import { Route } from '@src/screens/portrait/Route';
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
import { UpdateBrandScreen } from '@src/screens/portrait/main/brand';
import { UpdateGroupScreen } from '@src/screens/portrait/main/group';
import {
  OperationDetailScreen,
  POSSellerScreen,
} from '@src/screens/portrait/main/pos';
import { CustomerListScreen } from '@src/screens/portrait/main/customer/CustomerListScreen';
import { UpdateCustomerScreen } from '@src/screens/portrait/main/customer/UpdateCustomerScreen';
import { MenuScreen } from '@src/screens/portrait/main/pos/menu';
import { ReceiptScreen } from '@src/screens/portrait/main/pos/receipt';
import { CloseOutReportScreen } from '@src/screens/portrait/main/closeouttreport';
import Button from '@core/components/buttonbase/Button';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import { BillScreen } from '@src/screens/portrait/main/bill';
import { DrawerMenu } from '@src/screens/portrait/components';

export const PortraitApp: FC = memo(() => {
  const { user, init } = useAuthContext();
  const headerStyle = {
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
  };

  const createHeaderTopStack = (title: string): any => {
    return {
      headerShown: true,
      headerLeft: null,
      header: (props: any) => (
        <View.Row style={{ backgroundColor: 'green' }}>
          <Button.B
            style={{ backgroundColor: 'green', width: 50, minWidth: 50 }}
            textStyle={{ color: 'white', fontWeight: 'bold' }}
            label={'Func'}
            onPress={() => {
              props?.navigation?.openDrawer();
            }}
          />
          <Label.T
            style={{
              flex: 5,
              fontWeight: 'bold',
              fontSize: 24,
              color: 'white',
              textAlign: 'center',
            }}
            text={title}
          />
          <View.V style={{ flex: 1 }} />
        </View.Row>
      ),
    };
  };

  const POSStack = () => {
    return (
      <OperationListContextProvider>
        <OperationContextProvider>
          <StackNavigator
            screenOptions={{ ...headerStyle }}
            screens={[
              {
                name: Route.OPERATION_LIST,
                component: POSSellerScreen,
                options: {
                  ...createHeaderTopStack('Operation List'),
                },
              },
              {
                name: Route.OPERATION_DETAIL,
                component: OperationDetailScreen,
              },
              {
                name: Route.MENU_SCREEN,
                component: MenuScreen,
                options: { title: 'Booking Product' },
              },
              {
                name: Route.ASSIGN_CUSTOMER,
                component: CustomerListScreen,
                options: {
                  ...headerStyle,
                  headerShown: true,
                  title: 'Assign Customer',
                },
              },
              {
                name: Route.CUSTOMER_UPDATE,
                component: UpdateCustomerScreen,
                options: { headerShown: true },
              },
              {
                name: Route.RECEIPT,
                component: ReceiptScreen,
                options: { headerShown: true },
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
        screenOptions={{ ...headerStyle }}
        screens={[
          {
            name: Route.PRODUCT_LIST,
            component: ProductListScreen,
            options: {
              ...createHeaderTopStack('Product List'),
            },
          },
          {
            name: Route.PRODUCT_UPDATE,
            component: UpdateProductScreen,
            options: { title: 'Update Product' },
          },
        ]}
      />
    );
  };
  const CustomerStack = () => {
    return (
      <StackNavigator
        screenOptions={{ ...headerStyle, headerShown: true }}
        screens={[
          {
            name: Route.CUSTOMER_LIST,
            component: CustomerListScreen,
            options: {
              ...createHeaderTopStack('Customer List'),
            },
          },
          {
            name: Route.CUSTOMER_UPDATE,
            component: UpdateCustomerScreen,
            options: { headerShown: true, title: 'Update Customer' },
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
              drawerContent={props => <DrawerMenu {...props} />}
              screenOptions={{ ...headerStyle, headerShown: true }}
              screens={[
                {
                  name: Route.POS_SELLER,
                  component: POSStack,
                  options: { headerShown: false },
                },
                {
                  name: Route.BILL,
                  component: BillScreen,
                  options: {
                    ...createHeaderTopStack('Bill List'),
                  },
                },
                {
                  name: Route.PRODUCT,
                  component: ProductStack,
                  options: { headerShown: false },
                },

                {
                  name: Route.BRANCH,
                  component: UpdateBrandScreen,
                  options: {
                    ...createHeaderTopStack('Brands'),
                  },
                },
                {
                  name: Route.GROUP,
                  component: UpdateGroupScreen,
                  options: {
                    ...createHeaderTopStack('Group'),
                  },
                },
                {
                  name: Route.CUSTOMER,
                  component: CustomerStack,
                  options: { headerShown: false },
                },
                {
                  name: Route.CLOSE_OUT_REPORT,
                  component: CloseOutReportScreen,
                  options: {
                    ...createHeaderTopStack('Close Out Report'),
                  },
                },
              ]}
            />
          </>
        </DataContextProvider>
      </SettingContextProvider>
    );
  };

  return !init ? (
    <></>
  ) : (
    <StackNavigator
      initialRouteName={!!user ? Route.APP : Route.LOGIN}
      screens={[
        {
          name: Route.LOGIN,
          component: LoginScreen,
          options: { headerShown: false },
        },
        {
          name: Route.APP,
          component: !!user ? MainStack : () => <></>,
          options: { ...headerStyle, headerShown: false },
        },
      ]}
    />
  );
});
