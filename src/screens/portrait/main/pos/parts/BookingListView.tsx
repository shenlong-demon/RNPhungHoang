import React, {FC, memo, useCallback, useMemo} from 'react';
import {
  Booking,
  Operation,
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
import {Dto} from '@core/common';
import Label from '@core/components/labelbase/Label';

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
  const facade = useOperationFacade();
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
          key={data.item.id}
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

  const addService = async (
    name: string,
    price: number,
    note: string,
  ): Promise<void> => {
    const dto: Dto<Operation | null> = await facade.addService(
      name,
      price,
      note,
    );
    if (dto.next()) {
      setSelectedBooking(null);
      setOperationActionScreenIndex(OPERATION_ACTION_SCREEN.BOOKING_LIST);
    }
    closeAllPopups();
  };
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
      <View.Row>
        <Label.T text={`${operation?.total || ''}`} />
      </View.Row>
      <View.Row style={{justifyContent: 'space-between'}}>
        <Button.B
          style={[styles.button, {backgroundColor: '#0483d9'}]}
          textStyle={{color: 'white'}}
          label={'Add service'}
          onPress={openAddServicePopup}
        />
        <Button.B
          style={[styles.button, {backgroundColor: '#8b04d9'}]}
          textStyle={{color: 'white'}}
          label={'Add product'}
          onPress={openMenu}
        />
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
  button: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
});
