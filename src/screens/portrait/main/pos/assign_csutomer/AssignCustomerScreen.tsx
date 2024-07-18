import {FC, memo, useMemo} from 'react';
import View from '@core/components/viewbase/View';
import {StyleSheet} from 'react-native';
import {
  Customer,
  Operation,
  STATUS,
  useOperationContext,
  useOperationFacade,
} from '@src/business';
import {CustomerListView} from '@src/screens/portrait/main/customer/parts';
import {Dto} from '@core/common';
import {useNavigation} from '@core/navigation';

type Props = {};
export const AssignCustomerScreen: FC<Props> = memo(({}: Props) => {
  const {goBack} = useNavigation();
  const facade = useOperationFacade();

  const onPressCustomer = async (customer: Customer): Promise<void> => {
    const dto: Dto<Operation | null> = await facade.assignCustomer(customer);
    if (dto.next()) {
      goBack();
    }
  };
  return (
    <View.V style={styles.container}>
      <CustomerListView
        onPressItem={onPressCustomer}
        selectedStatus={STATUS.ACTIVE}
      />
    </View.V>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {},
  list: {flex: 1},
});
