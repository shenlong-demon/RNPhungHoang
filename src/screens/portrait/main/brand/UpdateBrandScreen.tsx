import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Brand,
  DataContextResult,
  STATUS,
  useDataContext,
  usePopupContext,
} from '@src/business';
import View from '@core/components/viewbase/View';
import { Button, FlatList } from '@core/components';
import Label from '@core/components/labelbase/Label';
import { UpdateBrandPopup } from '@src/screens/portrait/components/popup';
import { Dto } from '@core/common';

export const UpdateBrandScreen = () => {
  const { openPopup, closeAllPopups } = usePopupContext();
  const { brands, createBrand, updateBrand }: DataContextResult =
    useDataContext();
  useEffect(() => {
    // loadBrands();
  }, []);

  const createNewBrand = async (
    name: string,
    status: STATUS,
  ): Promise<void> => {
    const dto: Dto<Brand | null> = await createBrand(name, status);
    if (dto.next()) {
      closeAllPopups();
    }
  };
  const updateExistBrand = async (
    id: number,
    name: string,
    status: STATUS,
  ): Promise<void> => {
    const dto: Dto<Brand | null> = await updateBrand(id, name, status);
    if (dto.next()) {
      closeAllPopups();
    }
  };
  const onCreate = (): void => {
    openPopup(
      'Create New Brand',
      <UpdateBrandPopup onOk={createNewBrand} onCancel={closeAllPopups} />,
    );
  };
  const onEdit = (brand: Brand): void => {
    openPopup(
      'Update Brand',
      <UpdateBrandPopup
        selectedBrand={brand}
        onOk={(name: string, status: STATUS) =>
          updateExistBrand(brand.id, name, status)
        }
        onCancel={closeAllPopups}
      />,
    );
  };

  const renderItem = (data: { item: Brand; index: number }): any => {
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
        data={brands}
        renderItem={renderItem}
        keyExtractor={(item: Brand, index: number) => `${item.id}_${index}`}
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
