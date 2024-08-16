import React, { FC, useEffect, useState } from 'react';
import View from '@core/components/viewbase/View';
import { StyleSheet } from 'react-native';
import Input from '@core/components/inputbase/Input';
import { FlatList } from '@core/components';
import { Bill, useBillFacade, usePopupContext } from '@src/business';
import { CONSTANTS } from '@core/common';
import { useDebounce } from '@core/use_hook';
import { BillListItemView } from '@src/screens/portrait/main/bill/parts';
import { BillInfoPopup } from '@src/screens/portrait/components/popup';

type Props = {};
export const BillScreen: FC<Props> = ({}: Props) => {
  const [input, setInput] = useState<string>(CONSTANTS.STR_EMPTY);
  const { bills, setSearchText, reloadBills, loadMore } = useBillFacade();
  const searchText = useDebounce(input);
  const [isRefreshing, setIsFreshing] = useState<boolean>(false);
  const { closeAllPopups, openPopup } = usePopupContext();
  useEffect(() => {
    setSearchText(searchText);
  }, [searchText]);

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
      <Input.T style={{}} onChangeText={setInput} />
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
