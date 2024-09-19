import React, { FC, memo, useEffect, useState } from 'react';
import View from '@core/components/viewbase/View';
import { StyleSheet } from 'react-native';
import {
  CreateProductRequest,
  Product,
  STATUS,
  useDataContext,
  useOperationContext,
  usePopupContext,
  useProductSearchFacade,
} from '@src/business';
import { Button, FlatList } from '@core/components';
import Input from '@core/components/inputbase/Input';
import { MenuItemView } from '@src/screens/portrait/main/pos/menu/parts';
import { useNavigation } from '@core/navigation';
import { AddSimpleProductPopup } from '@src/screens/portrait/components';
import { CONSTANTS, Dto } from '@core/common';

type Props = {};
export const MenuScreen: FC<Props> = memo(({}: Props) => {
  const { openPopup, closeAllPopups } = usePopupContext();
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<string | null>(null);
  const productSearchFacade = useProductSearchFacade();
  const { products } = useDataContext();
  const { booking } = useOperationContext();
  const { goBack } = useNavigation();
  const { createProduct } = useDataContext();

  useEffect(() => {
    setSearchProducts(productSearchFacade.search(searchText, STATUS.ACTIVE));
  }, [searchText, products]);

  const book = async (menuItem: Product): Promise<void> => {
    booking(menuItem);
    goBack();
  };
  const openCreateProductPopup = async (): Promise<void> => {
    openPopup(
      `Create Operation`,
      <AddSimpleProductPopup
        onCancel={closeAllPopups}
        onOk={async (
          name: string,
          basePrice: number,
          price: number,
        ): Promise<void> => {
          const dto: Dto<Product | null> = await createProduct(
            {
              name,
              code: CONSTANTS.STR_EMPTY,
              otherName: CONSTANTS.STR_EMPTY,
              basePrice,
              price,
              quantity: 1000,
              status: STATUS.ACTIVE,
            } as CreateProductRequest,
            undefined,
          );
          closeAllPopups();
          if (dto.next() && dto.data) {
            const newProduct: Product = dto.data as Product;
            book(newProduct);
          }
        }}
      />,
    );
  };
  const renderItem = (data: { item: Product; index: number }): any => {
    return (
      <MenuItemView
        key={`${data.item.id}`}
        item={data.item}
        index={data.index}
        onPress={() => book(data.item)}
      />
    );
  };
  return (
    <View.V style={styles.container}>
      <Input.T
        style={styles.searchText}
        placeholder={'Please input text to search'}
        autoFocus={true}
        onChangeText={setSearchText}
      />
      <FlatList.L
        style={styles.list}
        data={searchProducts}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item: Product, index: number) => `${item.id}_${index}`}
      />
      <Button.FloatCirle
        position={'bottom|right'}
        onPress={() => openCreateProductPopup()}
      />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  resultContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  searchText: {},
});
