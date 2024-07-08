import {FC, memo, useCallback, useMemo} from 'react';
import {Booking, useOperationContext} from '@src/business';
import {FlatList, StyleSheet} from 'react-native';
import {BookingView} from '@src/screens/portrait/main/pos/parts/BookingView';
import {View} from '@core/components';

type Props = {};
export const BookingListView: FC<Props> = memo(({}: Props) => {
  const {operation} = useOperationContext();
  const bookingItems = useMemo((): Booking[] => {
    return operation?.bookings || [];
  }, [operation]);

  const renderBookingListItem = useCallback(
    (data: {item: Booking; index: number}): any => {
      return <BookingView item={data.item} index={data.index} />;
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
