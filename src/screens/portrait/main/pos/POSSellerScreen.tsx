import React, {FC, memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Operation, usePopupContext} from '@src/business';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import {FlatList} from '@core/components';
import {OperationListItemView} from '@src/screens/portrait/main/pos/parts';

type Props = {};
export const POSSellerScreen: FC<Props> = memo(({}) => {
  const {navigate} = useNavigation();
  const {openPopup} = usePopupContext();
  const onClick = (item: Operation | null): void => {
    navigate(Route.OPERATION_DETAIL, item);
  };

  const createOperation = () => {
    openPopup();
  };

  const renderOpdrationListItem = useCallback(
    (data: {item: Operation; index: number}) => {
      return <OperationListItemView operation={data.item} index={data.index} />;
    },
    [],
  );
  return (
    <View.V style={styles.container}>
      <FlatList.L
        style={styles.flatList}
        data={[]}
        renderItem={renderOpdrationListItem}
      />
      <Button.FloatCircle
        position={'bottom|right'}
        onPress={() => createOperation()}
      />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {},
  flatList: {},
});
