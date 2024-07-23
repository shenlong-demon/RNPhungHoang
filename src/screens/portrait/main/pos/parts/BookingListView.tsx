import React, {FC, memo, useCallback, useMemo} from 'react';
import {
  Booking,
  OPERATION_ACTION_SCREEN,
  useOperationContext,
  useOperationFacade,
  usePopupContext,
} from '@src/business';
import {StyleSheet} from 'react-native';
import {BookingItemView} from '@src/screens/portrait/main/pos/parts/BookingItemView';
import {FlatList} from '@core/components';
import Button from '@core/components/buttonbase/Button';
import {Route} from '@src/screens/portrait/Route';
import {useNavigation} from '@core/navigation';
import View from '@core/components/viewbase/View';
import {AddServicePopup} from '@src/screens/portrait/components/popup';

type Props = {};
export const BookingListView: FC<Props> = memo(({}: Props) => {
  const {
    operationActionScreenIndex,
    operation,
    setSelectedBooking,
    selectedBooking,
    setOperationActionScreenIndex,
  } = useOperationContext();
  const {navigate} = useNavigation();
  const {openPopup, closeAllPopups} = usePopupContext();
  const {addService} = useOperationFacade();
  const bookingItems = useMemo((): Booking[] => {
    return operation?.bookings || [];
  }, [operation]);

  const openMenu = (): void => {
    navigate(Route.MENU_SCREEN);
  };

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
          onLongPress={async (): Promise<void> => {
            setSelectedBooking(data.item);
            setOperationActionScreenIndex(OPERATION_ACTION_SCREEN.ACTION);
          }}
        />
      );
    },
    [setSelectedBooking, selectedBooking],
  );

  const openAddServicePopup = (): void => {
    openPopup(
      'AddService',
      <AddServicePopup onOk={addService} onCancel={closeAllPopups} />,
    );
  };
  return (
    <View.V
      style={
        operationActionScreenIndex === OPERATION_ACTION_SCREEN.BOOKING_LIST
          ? styles.fullContainer
          : styles.hideContainer
      }>
      <FlatList.L
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator
        style={styles.listContainer}
        data={bookingItems}
        renderItem={renderBookingListItem}
      />
      <View.Row style={{justifyContent: 'space-between'}}>
        <Button.B label={'Add service'} onPress={openAddServicePopup} />
        <Button.B label={'Add product'} onPress={openMenu} />
      </View.Row>
    </View.V>
  );
});
const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    // height: '100%',
    // backgroundColor: 'green',
  },
  hideContainer: {
    flex: 0,
    height: 0,
  },
  listContainer: {
    flex: 1,
    // backgroundColor: 'green',
  },
});
