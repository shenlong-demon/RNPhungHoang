import React, { FC } from 'react';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import Button from '@core/components/buttonbase/Button';
import { Route } from '@src/screens/portrait/Route';
import { ENV, useAuthContext } from '@src/business';
import { StyleSheet } from 'react-native';

type Props = {
  navigation: any;
};
export const DrawerMenu: FC<Props> = ({ navigation }: Props) => {
  const { logout } = useAuthContext();
  const doLogout = async (): Promise<void> => {
    logout();
    navigation.navigate(Route.LOGIN);
  };
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
            onPress={doLogout}
            style={{ backgroundColor: 'red', width: '100%', marginBottom: 10 }}
            textStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
          />
        </View.V>
      </View.V>
    </View.V>
  );
};

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
