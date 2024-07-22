import React, {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import {View} from '@core/components';
import {
  OPERATION_ACTION_SCREEN,
  useOperationContext,
  useOperationFacade,
  usePopupContext,
} from '@src/business';
import Button from '@core/components/buttonbase/Button';
import {UpdateOperationIssuePopup} from '@src/screens/portrait/components/popup';
import {File} from '@core/models';

type Props = {};
export const IssueListView: FC<Props> = memo(({}: Props) => {
  const {operationActionScreenIndex} = useOperationContext();
  const {addIssue} = useOperationFacade();
  const {openPopup, closeAllPopups} = usePopupContext();
  const onOk = (note: string, image?: File) => {
    addIssue(note, image);
  };
  const openIssuePopup = (): void => {
    openPopup(
      'UpdateOperationIssuePopup',
      <UpdateOperationIssuePopup onCancel={closeAllPopups} onOk={onOk} />,
    );
  };
  return (
    <View.V
      style={
        operationActionScreenIndex === OPERATION_ACTION_SCREEN.ISSUE
          ? styles.fullContainer
          : styles.hideContainer
      }>
      <Button.FloatCircle position={'bottom|right'} onPress={openIssuePopup} />
    </View.V>
  );
});
const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  hideContainer: {
    flex: 0,
  },
  listContainer: {flex: 1},
});
