import React, { FC, memo } from 'react';
import View from '@core/components/viewbase/View';
import { StyleSheet } from 'react-native';
import { CustomerListView } from '@src/screens/portrait/main/customer/parts';
import Button from '@core/components/buttonbase/Button';
import { useNavigation } from '@core/navigation';
import { Route } from '@src/screens/portrait/Route';
import { Customer, STATUS } from '@src/business';
import { CustomerUpdateNavigationParam } from '@src/screens/portrait/main/customer/UpdateCustomerScreen';

export type CustomerListNavigationParam = {
  assignCustomerFunc?: (
    selectedCustomer: Customer,
    fromSelected: boolean,
  ) => void;
};
type Props = {};
export const CustomerListScreen: FC<Props> = memo(({}: Props) => {
  const { navigate } = useNavigation();
  const { getParam, goBack } = useNavigation();
  const param: CustomerListNavigationParam | null = getParam();
  const isForAssignCustomerToOperation: boolean = !!param?.assignCustomerFunc;
  const filterStatus: STATUS | null = isForAssignCustomerToOperation
    ? STATUS.ACTIVE
    : null;

  const createCustomer = (): void => {
    navigate(Route.CUSTOMER_UPDATE, {
      customer: null,
      assignCustomerFunc: param?.assignCustomerFunc,
    } as CustomerUpdateNavigationParam);
  };
  const enterCustomer = (customer: Customer): void => {
    if (!!param?.assignCustomerFunc) {
      param.assignCustomerFunc(customer, true);
    } else {
      navigate(Route.CUSTOMER_UPDATE, { customer: customer });
    }
  };
  return (
    <View.V style={styles.container}>
      <CustomerListView
        onPressItem={enterCustomer}
        selectedStatus={filterStatus}
      />
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
    paddingLeft: 10,
    paddingRight: 10,
  },
});
