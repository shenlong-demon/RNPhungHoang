import React, {FC, memo} from 'react';
import {View} from '@core/components';
import {StyleSheet} from 'react-native';
import {
  useOperationContext,
  useOperationFacade,
  usePopupContext,
} from '@src/business';
import {
  BookingListView,
  IssueListView,
} from '@src/screens/portrait/main/pos/parts';
import Button from '@core/components/buttonbase/Button';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';
import {OperationMenuPopup} from '@src/screens/portrait/components/popup';

type Props = {};
const ACTION_MENU: string = 'ACTION_MENU';
export const OperationDetailScreen: FC<Props> = memo(({}) => {
  const {operation} = useOperationContext();
  const {navigate} = useNavigation();
  const {openPopup, closePopup} = usePopupContext();
  const facade = useOperationFacade();

  const openMenu = (): void => {
    navigate(Route.MENU_SCREEN);
  };

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
      <View.V>
        <IssueListView />
      </View.V>

      <BookingListView />
      <Button.FloatCircle
        position={'bottom|right'}
        onPress={openMenu}
        onLongPress={openActionPopup}
      />
      <Button.FloatCircle
        position={'center|bottom'}
        onPress={openAssignCustomer}
      />
    </View.V>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});
