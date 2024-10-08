import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { Button, FlatList, View } from '@core/components';
import { Product, useDataContext, useProductSearchFacade } from '@src/business';
import { useNavigation } from '@core/navigation';
import { ProductListItemView } from '@src/screens/portrait/main/product';
import { Route } from '@src/screens/portrait/Route';
import Input from '@core/components/inputbase/Input';
import { StyleSheet } from 'react-native';

type Props = {};

export const ProductListScreen: FC<Props> = memo(({}) => {
  const { navigate } = useNavigation();
  const [searchText, setSearchText] = useState<string | null>(null);
  const [displayProduct, setDisplayProducts] = useState<Product[]>([]);
  const { products } = useDataContext();

  const { search } = useProductSearchFacade();

  const onClick = useCallback(async (item: Product | null): Promise<void> => {
    navigate(Route.PRODUCT_UPDATE, item);
  }, []);

  useEffect(() => {
    const searchProducts: Product[] = search(searchText, null);
    setDisplayProducts(searchProducts);
  }, [searchText, products]);

  const renderProductItem = useCallback(
    (data: { item: Product; index: number }): any => {
      return (
        <ProductListItemView
          key={`${data.item.id}`}
          item={data.item}
          index={data.index}
          onClick={() => onClick(data.item)}
        />
      );
    },
    [products],
  );

  return (
    <View.V style={styles.container}>
      <Input.T
        style={styles.searchText}
        placeholder={'Please input text to search'}
        autoFocus={true}
        onChangeText={setSearchText}
      />
      <FlatList.L
        style={{ flex: 1 }}
        data={displayProduct}
        keyExtractor={item => item.id}
        renderItem={renderProductItem}
      />
      <Button.FloatCirle
        position={'bottom|right'}
        onPress={() => onClick(null)}
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
