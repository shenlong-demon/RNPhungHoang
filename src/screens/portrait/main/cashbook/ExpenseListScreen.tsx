import React, { FC, memo, useCallback, useState } from 'react';
import View from '@core/components/viewbase/View';
import Input from '@core/components/inputbase/Input';
import { DateTimePicker, FlatList } from '@core/components';
import { DISPLAY_MODE } from '@core/components/datetimepicker/DateTimePickerBase';
import Button from '@core/components/buttonbase/Button';
import {
  Bill,
  Expense,
  useExpenseFacade,
  usePopupContext,
} from '@src/business';
import { StyleSheet } from 'react-native';
import { CreateExpensePopup } from '@src/screens/portrait/components';
import { Dto } from '@core/common';
import { ExpenseListItemView } from '@src/screens/portrait/main/cashbook/parts';

type Props = {};
export const ExpenseListScreen: FC<Props> = memo(({}: Props) => {
  const {
    setSearchText,
    searchText,
    selectedDate,
    setSelectedDate,
    clear,
    loadMore,
    data,
    reloadData,
    createExpense,
  } = useExpenseFacade();
  const [isRefreshing, setIsFreshing] = useState<boolean>(false);
  const { openPopup, closeAllPopups } = usePopupContext();
  const onRefresh = async (): Promise<void> => {
    setIsFreshing(true);
    await reloadData();
    setIsFreshing(false);
  };

  const renderItem = useCallback(
    (data: { item: Expense; index: number }): any => {
      return <ExpenseListItemView item={data.item} index={data.index} />;
    },
    [],
  );
  const openCreateExpensePopup = () => {
    openPopup(
      `Create Expense`,
      <CreateExpensePopup
        onCancel={closeAllPopups}
        onOk={async (name: string, price: number): Promise<void> => {
          const dto: Dto<Expense | null> = await createExpense(name, price);
          closeAllPopups();
        }}
      />,
    );
  };

  return (
    <View.V style={styles.container}>
      <View.Row>
        <Input.T
          style={{ minWidth: '40%', width: 100 }}
          onChangeText={setSearchText}
          value={searchText}
          placeholder={'Input search text'}
        />
        <DateTimePicker.DT
          defaultValue={selectedDate}
          style={{ marginLeft: 10, marginRight: 10 }}
          onChange={setSelectedDate}
          mode={DISPLAY_MODE.DATE}
        />
        <Button.Cancel
          style={{ minWidth: 50 }}
          label={'Clear'}
          onPress={clear}
        />
      </View.Row>

      <FlatList.L
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: Bill, index: number) => `${item.id}_${index}`}
        style={styles.list}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        onEndReachedThreshold={0.3}
        onEndReached={loadMore}
      />
      <Button.FloatCircle
        position={'bottom|right'}
        onPress={openCreateExpensePopup}
      />
    </View.V>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
