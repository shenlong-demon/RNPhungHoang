import React, {FC, memo, useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Operation,
  useOperationContext,
  useOperationListContext,
  usePopupContext,
} from '@src/business';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import {FlatList} from '@core/components';
import {OperationListItemView} from '@src/screens/portrait/main/pos/parts';
import {CreateOperationPopup} from '@src/screens/portrait/components/popup';
import {Dto} from '@core/common';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';

type Props = {};
export const POSSellerScreen: FC<Props> = memo(({}) => {
  const {operations, reloadOperations} = useOperationListContext();
  const {enterOperation, createOperation} = useOperationContext();
  const {openPopup, closeAllPopups} = usePopupContext();
  const {navigate} = useNavigation();
  const [isRefreshing, setIsFreshing] = useState<boolean>(false);

  const enter = async (item: Operation): Promise<void> => {
    const dto: Dto<Operation | null> = await enterOperation(item);
    if (dto.next()) {
      navigate(Route.OPERATION_DETAIL, dto.data);
    }
  };

  const createNewOperation = () => {
    openPopup(
      `Create Operation`,
      <CreateOperationPopup
        onCancel={closeAllPopups}
        onOk={async (operationName?: string): Promise<void> => {
          const dto: Dto<Operation | null> = await createOperation(
            operationName,
          );
          if (dto.next()) {
            closeAllPopups();
            navigate(Route.OPERATION_DETAIL, dto.data);
          }
        }}
      />,
    );
  };

  const renderOperationListItem = (data: {item: Operation; index: number}) => {
    return (
      <OperationListItemView
        key={data.item.id}
        onPress={() => enter(data.item)}
        operation={data.item}
        index={data.index}
      />
    );
  };
  const onRefresh = async (): Promise<void> => {
    setIsFreshing(true);
    await reloadOperations();
    setIsFreshing(false);
  };
  return (
    <View.V style={styles.container}>
      <FlatList.L
        style={styles.flatList}
        data={operations}
        renderItem={renderOperationListItem}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
      <Button.FloatCircle
        position={'bottom|right'}
        onPress={() => createNewOperation()}
      />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {flex: 1},
  flatList: {},
});
