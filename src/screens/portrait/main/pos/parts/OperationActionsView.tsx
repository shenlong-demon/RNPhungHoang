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

type Props = {};
export const OperationActionsView: FC<Props> = memo(({}: Props) => {
  const facade = useOperationFacade();
  const {selectedBooking, setOperationActionScreenIndex, operation} =
    useOperationContext();
  const {openPopup, closeAllPopups} = usePopupContext();
  const setOperationDiscount = async (newDiscount: number): Promise<void> => {
    const dto: Dto<Operation | null> = await facade.setOperationDiscount(
      newDiscount,
    );
    if (dto.next()) {
      setOperationActionScreenIndex(OPERATION_ACTION_SCREEN.OPERATION_INFO);
    }
    closeAllPopups();
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
      'Cancel',
      <YesNoPopup
        message={`Do you want to cancel ${selectedBooking?.name}`}
        onOk={cancelBooking}
        onCancel={closeAllPopups}
      />,
    );
  };
  const doSetBookingNote = async (): Promise<void> => {
    openPopup(
      `Set Booking's Note`,
      <SetNotePopup
        defaultNote={selectedBooking?.note}
        onOk={setBookingNote}
        onCancel={closeAllPopups}
      />,
    );
  };
  return (
    <View.V style={styles.container}>
      <View.V style={styles.actionView}>
        {!!selectedBooking ? (
          <>
            <View.Row>
              <Label.T
                style={{fontWeight: 'bold'}}
                text={`Actions for      [${selectedBooking.name}]`}
              />
            </View.Row>
            <Button.B
              style={[styles.button, {backgroundColor: '#c0efff'}]}
              label={`Set note`}
              onPress={doSetBookingNote}
            />
            <Button.B
              style={[styles.button, {backgroundColor: 'red'}]}
              textStyle={{color: 'white'}}
              label={`Cancel`}
              onPress={doCancelBooking}
            />
          </>
        ) : null}
      </View.V>
      <View.V style={styles.operationActionView}>
        <Button.B
          style={[styles.buttonOperation, {backgroundColor: '#dec1ff'}]}
          label={'Set Discount'}
          onPress={doSetDiscount}
        />
      </View.V>
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {flex: 1, paddingLeft: 10, paddingRight: 10},
  actionView: {
    flex: 1,
    // justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  operationActionView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    width: '70%',
  },
  buttonOperation: {
    marginBottom: 10,
    marginTop: 20,
    width: '70%',
  },
});
