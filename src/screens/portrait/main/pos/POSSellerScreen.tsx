import React, {FC, memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  Operation,
  useOperationFacade,
  useOperationListContext,
  usePopupContext,
} from '@src/business';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import {FlatList} from '@core/components';
import {OperationListItemView} from '@src/screens/portrait/main/pos/parts';
import {CreateOperationPopup} from '@src/screens/portrait/components/popup';

type Props = {};
export const POSSellerScreen: FC<Props> = memo(({}) => {
  const {operations} = useOperationListContext();
  const useFacade = useOperationFacade();
  const {openPopup, closeAllPopups} = usePopupContext();

  const enter = async (item: Operation): Promise<void> => {
    useFacade.enterOperation(item.id);
  };

  const createOperation = () => {
    useFacade.openCreateOperationPopup();
  };

  const renderOperationListItem = useCallback(
    (data: {item: Operation; index: number}) => {
      return (
        <OperationListItemView
          onPress={() => enter(data.item)}
          operation={data.item}
          index={data.index}
        />
      );
    },
    [],
  );
  return (
    <View.V style={styles.container}>
      <FlatList.L
        style={styles.flatList}
        data={operations}
        renderItem={renderOperationListItem}
      />
      <Button.FloatCircle
        position={'bottom|right'}
        onPress={() => createOperation()}
      />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {flex: 1},
  flatList: {},
});
