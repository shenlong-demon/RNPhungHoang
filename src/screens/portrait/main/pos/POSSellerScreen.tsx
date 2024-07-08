import React, {FC, memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Operation, useOperationContext, usePopupContext} from '@src/business';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import {FlatList} from '@core/components';
import {OperationListItemView} from '@src/screens/portrait/main/pos/parts';
import {CreateOperationPopup} from '@src/screens/portrait/components/popup/CreateOperationPopup';

type Props = {};
const CREATE_POPUP_ID: string = 'CREATE_POPUP_ID';
export const POSSellerScreen: FC<Props> = memo(({}) => {
  const {navigate} = useNavigation();
  const {openPopup, closeAllPopups} = usePopupContext();
  const {setOperation, updateOperationInList, operations} =
    useOperationContext();

  const enter = (item: Operation): void => {
    navigate(Route.OPERATION_DETAIL, item);
  };
  const onOk = async (op: Operation): Promise<void> => {
    setOperation(op);
    updateOperationInList(op);
    navigate(Route.OPERATION_DETAIL, op);
    closeAllPopups();
  };

  const createOperation = () => {
    openPopup(
      CREATE_POPUP_ID,
      <CreateOperationPopup onCancel={closeAllPopups} onOk={onOk} />,
    );
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
