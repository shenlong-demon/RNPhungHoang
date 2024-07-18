import React, {FC, memo} from 'react';
import View from '@core/components/viewbase/View';
import {StyleSheet} from 'react-native';
import {CustomerListView} from '@src/screens/portrait/main/customer/parts';
import Button from '@core/components/buttonbase/Button';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';
import {Customer} from '@src/business';

type Props = {};
export const CustomerListScreen: FC<Props> = memo(({}: Props) => {
  const {navigate} = useNavigation();

  const createCustomer = (): void => {
    navigate(Route.CUSTOMER_UPDATE, null);
  };
  const enterCustomer = (customer: Customer): void => {
    // navigate(Route.CUSTOMER_UPDATE, null);
  };
  return (
    <View.V style={styles.container}>
      <CustomerListView onPressItem={enterCustomer} />
      <Button.FloatCircle
        position={'bottom|right'}
        onPress={() => createCustomer()}
      />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
