import React, {FC, memo, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {OPERATION_ACTION_SCREEN, useOperationContext} from '@src/business';
import {
  BookingListView,
  IssueListView,
  OperationActionsView,
  OperationDetailHeaderView,
  OperationInfoView,
  OperationTabActionView,
} from '@src/screens/portrait/main/pos/parts';
import View from '@core/components/viewbase/View';
import {useNavigation} from '@core/navigation';

type Props = {};
export const OperationDetailScreen: FC<Props> = memo(({}) => {
  const {operationActionScreenIndex, operation} = useOperationContext();
  const {setOptions} = useNavigation();
  useEffect(() => {
    setOptions({
      header: () => <OperationDetailHeaderView />,
      headerLeft: null,
      gestureEnabled: false,
    });
  }, [operation]);
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
