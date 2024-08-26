import { FC, memo, useCallback, useEffect, useState } from 'react';
import View from '@core/components/viewbase/View';
import { StyleSheet } from 'react-native';
import { Customer, STATUS } from '@src/business';
import Input from '@core/components/inputbase/Input';
import { FlatList } from '@core/components';
import { useCustomerFacade } from '@src/business/useFacade/useCustomerFacade';
import { CustomerListItemView } from '@src/screens/portrait/main/customer/parts/CustomerListItemView';
import { CONSTANTS } from '@core/common';
import { useDebounce } from '@core/use_hook';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  onPressItem: (customer: Customer) => void;
  selectedStatus: STATUS | null;
};
export const CustomerListView: FC<Props> = memo(
  ({ selectedStatus, onPressItem }: Props) => {
    const [searchCustomers, setSearchCustomer] = useState<Customer[]>([]);
    const [searchText, setSearchText] = useState<string>(CONSTANTS.STR_EMPTY);
    const debouncedValue = useDebounce(searchText);

    const facade = useCustomerFacade();

    useFocusEffect(
      useCallback(() => {
        let isLoad = true;
        getCustomers();
        return () => {
          isLoad = false;
        };
      }, [debouncedValue]),
    );

    useEffect(() => {
      getCustomers();
    }, [debouncedValue]);

    const getCustomers = async (): Promise<void> => {
      const customers: Customer[] = await facade.searchCustomers({
        searchText: debouncedValue,
        status: selectedStatus,
        offset: 0,
      });
      setSearchCustomer(customers);
    };

    const renderCustomer = (data: { item: Customer; index: number }): any => {
      return (
        <CustomerListItemView
          key={data.item.id}
          item={data.item}
          index={data.index}
          onPress={() => {
            onPressItem(data.item);
          }}
        />
      );
    };
    const onChangeSearchText = (text: string) => {
      setSearchText(text);
    };
    return (
      <View.V style={styles.container}>
        <Input.T
          placeholder={'Fill keyword to search customer'}
          style={styles.search}
          onChangeText={onChangeSearchText}
        />
        <FlatList.L
          style={styles.list}
          data={searchCustomers}
          renderItem={renderCustomer}
          keyExtractor={(item: Customer, index: number) =>
            `${item.id}_${index}`
          }
        />
      </View.V>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    marginBottom: 20,
  },
  list: { flex: 1 },
});
