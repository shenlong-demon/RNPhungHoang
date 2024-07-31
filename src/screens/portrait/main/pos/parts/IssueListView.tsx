import React, {FC, memo, useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  Issue,
  useOperationContext,
  useOperationFacade,
  usePopupContext,
} from '@src/business';
import Button from '@core/components/buttonbase/Button';
import {UpdateOperationIssuePopup} from '@src/screens/portrait/components/popup';
import {File} from '@core/models';
import View from '@core/components/viewbase/View';
import {FlatList} from '@core/components';
import Label from '@core/components/labelbase/Label';
import {CONSTANTS} from '@core/common';
import {IssueListItemView} from '@src/screens/portrait/main/pos/parts/IssueListItemView';

type Props = {};
export const IssueListView: FC<Props> = memo(({}: Props) => {
  const {operation} = useOperationContext();
  const {addIssue} = useOperationFacade();
  const {openPopup, closeAllPopups} = usePopupContext();
  const issues = useMemo((): Issue[] => {
    return operation?.issues || [];
  }, [operation]);
  const onOk = (note: string, image?: File) => {
    addIssue(note, image);
    closeAllPopups();
  };
  const openIssuePopup = (): void => {
    openPopup(
      'Add Issue',
      <UpdateOperationIssuePopup onCancel={closeAllPopups} onOk={onOk} />,
    );
  };

  const renderIssueListItem = useCallback(
    (data: {item: Issue; index: number}): any => {
      return (
        <IssueListItemView
          item={data.item}
          index={data.index}
          onPress={async () => {}}
          onLongPress={async () => {}}
          isSelected={false}
        />
      );
    },
    [],
  );
  return (
    <View.V style={styles.container}>
      <FlatList.L
        style={styles.list}
        data={issues}
        renderItem={renderIssueListItem}
      />
      <View.Row style={styles.actions}>
        <Button.B
          style={{backgroundColor: '#c23d3d'}}
          textStyle={{color: 'white'}}
          label={'Add Issue'}
          onPress={openIssuePopup}
        />
      </View.Row>
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },

  list: {
    flex: 1,
  },
  actions: {
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
