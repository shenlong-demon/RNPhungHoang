import React, { FC, useState } from 'react';
import View from '@core/components/viewbase/View';
import { StyleSheet } from 'react-native';
import Input from '@core/components/inputbase/Input';
import { DateTimePicker, FlatList } from '@core/components';
import { Bill, useBillFacade, usePopupContext } from '@src/business';
import { BillListItemView } from '@src/screens/portrait/main/bill/parts';
import { BillInfoPopup } from '@src/screens/portrait/components/popup';
import { DISPLAY_MODE } from '@core/components/datetimepicker/DateTimePickerBase';
import Button from '@core/components/buttonbase/Button';

type Props = {};
export const BillScreen: FC<Props> = ({}: Props) => {
  const {
    bills,
    setSearchText,
    searchText,
    setSelectedDate,
    selectedDate,
    clear,
    reloadBills,
    loadMore,
  } = useBillFacade();
  const [isRefreshing, setIsFreshing] = useState<boolean>(false);
  const { closeAllPopups, openPopup } = usePopupContext();

  const showBillInfo = async (bill: Bill): Promise<void> => {
    openPopup(
      'Bill Info',
      <BillInfoPopup bill={bill} onClose={closeAllPopups} />,
    );
  };

  const renderBill = (data: { item: Bill; index: number }): any => {
    return (
      <BillListItemView
        key={`${data.item.id}`}
        item={data.item}
        index={data.index}
        onPress={() => showBillInfo(data.item)}
      />
    );
  };
  const onRefresh = async (): Promise<void> => {
    setIsFreshing(true);
    await reloadBills();
    setIsFreshing(false);
  };
  return (
    <View.V style={styles.container}>
      <View.Row>
        <Input.T
          style={{ minWidth: '40%', width: 70, marginRight: 20 }}
          onChangeText={setSearchText}
          value={searchText}
        />
        <DateTimePicker.DT
          defaultValue={selectedDate}
          style={{ marginLeft: 20, marginRight: 20 }}
          onChange={setSelectedDate}
          mode={DISPLAY_MODE.DATETIME}
        />
        <Button.Cancel
          style={{ minWidth: 50 }}
          label={'Clear'}
          onPress={clear}
        />
      </View.Row>

      <FlatList.L
        data={bills}
        renderItem={renderBill}
        keyExtractor={(item: Bill, index: number) => `${item.id}_${index}`}
        style={styles.list}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        onEndReachedThreshold={0.3}
        onEndReached={loadMore}
      />
    </View.V>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  list: {
    flex: 1,
  },
});
