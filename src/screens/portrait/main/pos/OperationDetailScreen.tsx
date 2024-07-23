import React, {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import {
  OPERATION_ACTION_SCREEN,
  useOperationContext,
  useOperationFacade,
  usePopupContext,
} from '@src/business';
import {
  BookingListView,
  IssueListView,
  OperationActionsView,
  OperationInfoView,
  OperationTabActionView,
} from '@src/screens/portrait/main/pos/parts';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';
import {OperationMenuPopup} from '@src/screens/portrait/components/popup';
import View from '@core/components/viewbase/View';

type Props = {};
const ACTION_MENU: string = 'ACTION_MENU';
export const OperationDetailScreen: FC<Props> = memo(({}) => {
  const {operation, operationActionScreenIndex} = useOperationContext();
  const {navigate} = useNavigation();
  const {openPopup, closePopup} = usePopupContext();
  const facade = useOperationFacade();

  const openAssignCustomer = (): void => {
    navigate(Route.ASSIGN_CUSTOMER);
  };
  const receipt = async (): Promise<void> => {
    facade.receipt();
  };

  const openActionPopup = (): void => {
    openPopup(
      ACTION_MENU,
      <OperationMenuPopup
        onCancel={() => {
          closePopup(ACTION_MENU);
        }}
        onReceipt={() => {
          receipt();
        }}
      />,
    );
  };
  return (
    <View.V style={styles.container}>
      <View.V style={styles.operationTabs}>
        <OperationTabActionView />
      </View.V>
      <View.V style={[styles.content]}>
        {operationActionScreenIndex === OPERATION_ACTION_SCREEN.BOOKING_LIST ? (
          <BookingListView />
        ) : operationActionScreenIndex === OPERATION_ACTION_SCREEN.ISSUE ? (
          <IssueListView />
        ) : operationActionScreenIndex === OPERATION_ACTION_SCREEN.ACTION ? (
          <OperationActionsView />
        ) : (
          <OperationInfoView />
        )}
      </View.V>
    </View.V>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  operationTabs: {
    width: 40,
  },
  content: {
    flex: 1,
    // backgroundColor: 'blue',
  },
});
