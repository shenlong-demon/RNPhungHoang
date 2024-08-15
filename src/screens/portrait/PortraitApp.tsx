import React, { FC, memo } from 'react';
import { DrawerNavigator, StackNavigator } from '@core/navigation';
import LoginScreen from '@src/screens/portrait/auth';

import { Route } from '@src/screens/portrait/Route';
import {
  DataContextProvider,
  ENV,
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
import { StyleSheet } from 'react-native';
import { BillScreen } from '@src/screens/portrait/main/bill';

type Props = {
  navigation: any;
};
const DrawerMenuContent = ({ navigation }: Props) => {
  const section = (
    title: string,
    items: { title: string; navigateToRoute: string }[],
  ): any => {
    return (
      <View.V>
        <Label.T text={title} style={styles.drawerContentHeaderText} />
        <View.V style={styles.drawerContentSectionView}>
          <>
            {items.map(item => {
              return (
                <Button.B
                  style={styles.drawerContentItemButton}
                  textStyle={{ fontSize: 18 }}
                  label={item.title}
                  onPress={() => {
                    navigation?.navigate(item.navigateToRoute);
                  }}
                />
              );
            })}
          </>
        </View.V>
      </View.V>
    );
  };
  return (
    <View.V style={{ flex: 1, backgroundColor: 'green' }}>
      {section('POS', [
        { title: 'Seller', navigateToRoute: Route.POS_SELLER },
        {
          title: 'Bill',
          navigateToRoute: Route.BILL,
        },
      ])}
      {section('PRODUCTS', [
        { title: 'Product', navigateToRoute: Route.PRODUCT },
      ])}
      {section('CUSTOMER', [
        { title: 'Customer', navigateToRoute: Route.CUSTOMER },
      ])}
      {section('MANAGE', [
        { title: 'Brand', navigateToRoute: Route.BRANCH },
        { title: 'Group', navigateToRoute: Route.GROUP },
      ])}
      {section('REPORT', [
        { title: 'Close Out Report', navigateToRoute: Route.CLOSE_OUT_REPORT },
      ])}
      <View.V
        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <View.V style={styles.drawerContentSectionView}>
          <Label.T
            text={`${ENV.ENV}`}
            style={{ color: 'white', alignSelf: 'center', marginBottom: 10 }}
          />
          <Button.B
            label={'Logout'}
            onPress={() => {}}
            style={{ backgroundColor: 'red', width: '100%', marginBottom: 10 }}
            textStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
          />
        </View.V>
      </View.V>
    </View.V>
  );
};
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
              drawerContent={props => <DrawerMenuContent {...props} />}
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
          component: MainStack,
          options: { ...headerStyle, headerShown: false },
        },
      ]}
    />
  );
});
const styles = StyleSheet.create({
  drawerContentHeaderText: {
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    height: 50,
  },
  drawerContentItemButton: {
    backgroundColor: 'white',
    marginBottom: 5,
  },
  drawerContentSectionView: {
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
});
