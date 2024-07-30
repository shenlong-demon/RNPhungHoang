import {FC, memo} from 'react';
import View from '@core/components/viewbase/View';
import {StyleSheet} from 'react-native';
import Button from '@core/components/buttonbase/Button';
import {
  Operation,
  OPERATION_ACTION_SCREEN,
  useOperationContext,
  useOperationFacade,
  usePopupContext,
} from '@src/business';
import Label from '@core/components/labelbase/Label';
import {
  SetNotePopup,
  SetPricePopup,
  YesNoPopup,
} from '@src/screens/portrait/components/popup';
import {Dto} from '@core/common';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';

type Props = {};
export const OperationActionsView: FC<Props> = memo(({}: Props) => {
  const {navigate} = useNavigation();
  const facade = useOperationFacade();
  const {selectedBooking, setOperationActionScreenIndex, operation} =
    useOperationContext();
  const {openPopup, closeAllPopups} = usePopupContext();
  const doReceipt = async (): Promise<void> => {};
  const setOperationDiscount = async (newDiscount: number): Promise<void> => {
    const dto: Dto<Operation | null> = await facade.setOperationDiscount(
      newDiscount,
    );
    if (dto.next()) {
      setOperationActionScreenIndex(OPERATION_ACTION_SCREEN.OPERATION_INFO);
    }
    closeAllPopups();
  };
  const doAssignCustomer = async (): Promise<void> => {
    navigate(Route.ASSIGN_CUSTOMER);
  };
  const doSetDiscount = async (): Promise<void> => {
    openPopup(
      'Set Discount',
      <SetPricePopup
        defaultPrice={operation?.discount}
        message={`Do you want to cancel ${selectedBooking?.name}`}
        label={'Discount'}
        onOk={setOperationDiscount}
        onCancel={closeAllPopups}
      />,
    );
  };
  const cancelBooking = async (): Promise<void> => {
    const dto: Dto<Operation | null> = await facade.cancelBooking();
    if (dto.next()) {
      setOperationActionScreenIndex(OPERATION_ACTION_SCREEN.BOOKING_LIST);
    }
    closeAllPopups();
  };
  const setBookingNote = async (newNote: string): Promise<void> => {
    const dto: Dto<Operation | null> = await facade.setBookingNote(newNote);
    if (dto.next()) {
      setOperationActionScreenIndex(OPERATION_ACTION_SCREEN.BOOKING_LIST);
    }
    closeAllPopups();
  };
  const doCancelBooking = async (): Promise<void> => {
    openPopup(
      'doCancelBooking',
      <YesNoPopup
        message={`Do you want to cancel ${selectedBooking?.name}`}
        onOk={cancelBooking}
        onCancel={closeAllPopups}
      />,
    );
  };
  const doSetBookingNote = async (): Promise<void> => {
    openPopup(
      'doSetBookingNote',
      <SetNotePopup
        defaultNote={selectedBooking?.note}
        onOk={setBookingNote}
        onCancel={closeAllPopups}
      />,
    );
  };
  return (
    <View.V style={styles.container}>
      <View.V style={styles.bookingActions}>
        {!!selectedBooking ? (
          <>
            <Label.T text={`Actions for ${selectedBooking.name}`} />
            <Button.B
              style={styles.button}
              label={`Set note`}
              onPress={doSetBookingNote}
            />
            <Button.B
              style={styles.button}
              label={`Cancel`}
              onPress={doCancelBooking}
            />
          </>
        ) : null}
      </View.V>
      <View.V>
        <Button.B
          style={styles.button}
          label={'Assign Customer'}
          onPress={doAssignCustomer}
        />
        <Button.B
          style={styles.button}
          label={'Set Discount'}
          onPress={doSetDiscount}
        />
        <Button.B
          style={styles.buttonReceipt}
          label={'Receipt'}
          onPress={doReceipt}
        />
      </View.V>
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {flex: 1},
  bookingActions: {
    flex: 1,
  },
  button: {
    marginTop: 2,
    marginBottom: 2,
  },
  buttonReceipt: {
    marginTop: 20,
  },
});
