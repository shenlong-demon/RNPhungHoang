import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  DataContextResult,
  Group,
  STATUS,
  useDataContext,
  usePopupContext,
} from '@src/business';
import View from '@core/components/viewbase/View';
import { Button, FlatList } from '@core/components';
import Label from '@core/components/labelbase/Label';
import { UpdateGroupPopup } from '@src/screens/portrait/components/popup';
import { Dto } from '@core/common';

export const UpdateGroupScreen = () => {
  const { openPopup, closeAllPopups } = usePopupContext();
  const { groups, createGroup, updateGroup }: DataContextResult =
    useDataContext();
  useEffect(() => {
    // loadGroups();
  }, []);

  const createNewGroup = async (
    name: string,
    status: STATUS,
  ): Promise<void> => {
    const dto: Dto<Group | null> = await createGroup(name, status);
    if (dto.next()) {
      closeAllPopups();
    }
  };
  const updateExistGroup = async (
    id: number,
    name: string,
    status: STATUS,
  ): Promise<void> => {
    const dto: Dto<Group | null> = await updateGroup(id, name, status);
    if (dto.next()) {
      closeAllPopups();
    }
  };
  const onCreate = (): void => {
    openPopup(
      'Create New Group',
      <UpdateGroupPopup onOk={createNewGroup} onCancel={closeAllPopups} />,
    );
  };
  const onEdit = (Group: Group): void => {
    openPopup(
      'Update Group',
      <UpdateGroupPopup
        selectedGroup={Group}
        onOk={(name: string, status: STATUS) =>
          updateExistGroup(Group.id, name, status)
        }
        onCancel={closeAllPopups}
      />,
    );
  };

  const renderItem = (data: { item: Group; index: number }): any => {
    return (
      <View.Row
        key={`${data.item.id}`}
        style={{
          backgroundColor:
            data.item.status === STATUS.ACTIVE
              ? data.index % 2 === 0
                ? 'rgba(234,252,234,0.37)'
                : 'white'
              : data.index % 2 === 0
              ? 'rgba(250,236,236,0.95)'
              : 'rgba(246,220,220,0.95)',
        }}
        onPress={() => onEdit(data.item)}>
        <Label.T text={data.item.name} />
      </View.Row>
    );
  };
  return (
    <View.V style={styles.container}>
      <FlatList.L
        style={styles.list}
        data={groups}
        renderItem={renderItem}
        keyExtractor={(item: Group, index: number) => `${item.id}_${index}`}
      />
      <Button.FloatCirle position={'bottom|right'} onPress={onCreate} />
    </View.V>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
