import {FC, memo, useCallback, useMemo} from 'react';
import {OperationItem, useOperationContext} from '@src/business';
import {FlatList, StyleSheet} from 'react-native';
import {OperationItemView} from '@src/screens/portrait/main/pos/parts/OperationItemView';
import {View} from '@core/components';

type Props = {};
export const OperationBookingListView: FC<Props> = memo(({}: Props) => {
  const {operation} = useOperationContext();
  const bookingItems = useMemo((): OperationItem[] => {
    return operation?.items || [];
  }, [operation]);

  const renderBookingListItem = useCallback(
    (data: {item: OperationItem; index: number}): any => {
      return <OperationItemView item={data.item} index={data.index} />;
    },
    [],
  );

  return (
    <View.V style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator
        style={styles.listContainer}
        data={bookingItems}
        renderItem={renderBookingListItem}
      />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {},
  listContainer: {},
});
