import {FC, memo, useCallback, useMemo} from 'react';
import {Booking, useOperationContext} from '@src/business';
import {StyleSheet} from 'react-native';
import {BookingItemView} from '@src/screens/portrait/main/pos/parts/BookingItemView';
import {FlatList, View} from '@core/components';

type Props = {};
export const BookingListView: FC<Props> = memo(({}: Props) => {
  const {operation, setSelectedBooking, selectedBooking} =
    useOperationContext();
  const bookingItems = useMemo((): Booking[] => {
    return operation?.bookings || [];
  }, [operation]);

  const renderBookingListItem = useCallback(
    (data: {item: Booking; index: number}): any => {
      return (
        <BookingItemView
          item={data.item}
          index={data.index}
          isSelected={data.item.appKey === selectedBooking?.appKey}
          onPress={async (): Promise<void> => {
            setSelectedBooking(data.item);
          }}
        />
      );
    },
    [setSelectedBooking, selectedBooking],
  );

  return (
    <View.V style={styles.container}>
      <FlatList.L
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
  container: {flex: 1},
  listContainer: {flex: 1},
});
