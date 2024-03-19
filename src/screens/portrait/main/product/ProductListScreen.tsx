import React, {FC, memo, useCallback, useState} from 'react';
import {View} from '@core/components';
import {Button, FlatList, Text} from 'react-native';
import {Product, STATUS} from '@src/business';
import {ProductListItem} from '@src/screens/portrait/main/product/product_list_item';

type Props = {};
const MOCKUP: Product[] = [
  {
    id: '1',
    name: 'Manh Yamaha',
    quantity: 100,
    price: 2000000,
    status: STATUS.ACTIVE,
    brandId: 1,
    groupId: 1,
  },
];
export const ProductListScreen: FC<Props> = memo(({}) => {
  const [products, setProducts] = useState<Product[]>(MOCKUP);

  const onEdit = useCallback(async (item: Product): Promise<void> => {}, []);

  const renderProductItem = useCallback(
    (data: {item: Product; index: number}): any => {
      return (
        <ProductListItem
          item={data.item}
          index={data.index}
          onEdit={() => onEdit(data.item)}
        />
      );
    },
    [],
  );
  return (
    <View.V>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderProductItem}
      />
    </View.V>
  );
});
