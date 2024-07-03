import React, {FC, memo, useCallback, useState} from 'react';
import {Button, View} from '@core/components';
import {Brand, Group, Product, useProductFacade} from '@src/business';
import {useNavigation} from '@core/navigation';
import {SelectBrandAndGroupView} from '@src/screens/portrait/shared_components';
import {FlatList} from 'react-native';
import {ProductListItem} from '@src/screens/portrait/main/product/product_list_item';
import {Logger} from '@core/common';
import {Route} from '@src/screens/portrait/Route';
import {ProductFilterRequest} from '@src/business/model';

type Props = {};

export const ProductListScreen: FC<Props> = memo(({}) => {
  const {navigate} = useNavigation();
  const productFacade = useProductFacade();
  const [products, setProducts] = useState<Product[]>([]);

  const [pageIndex, setPageIndex] = useState<number>(0);

  const onClick = useCallback(async (item: Product | null): Promise<void> => {
    navigate(Route.PRODUCT_UPDATE, item);
  }, []);

  const renderProductItem = useCallback(
    (data: {item: Product; index: number}): any => {
      return (
        <ProductListItem
          item={data.item}
          index={data.index}
          onClick={() => onClick(data.item)}
        />
      );
    },
    [],
  );

  const filterProductsBy = async (
    brand: Brand | null,
    group: Group | null,
  ): Promise<void> => {
    const request: ProductFilterRequest = {
      brandId: brand?.id || null,
      groupId: group?.id || null,
      offset: pageIndex,
    };
    const prs: Product[] = await productFacade.getProductsBy(request);
    Logger.log(() => [
      `ProductListScreen filterProductsBy request`,
      request,
      prs,
      prs.length,
    ]);
    setProducts(prs);
  };
  const onFilterChanged = (brand: Brand | null, group: Group | null) => {
    filterProductsBy(brand, group);
  };

  return (
    <View.V style={{flex: 1}}>
      <SelectBrandAndGroupView onChanged={onFilterChanged} />

      <FlatList
        style={{flex: 1}}
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderProductItem}
      />
      <Button.FloatCirle
        position={'bottom|right'}
        onPress={() => onClick(null)}
      />
      {/*<Button.FloatCirle position={'bottom|right'} onPress={() => navigate(Route.PRODUCT_UPDATE)} />*/}
      {/*<Button.B style={{width: 50, height: 50, backgroundColor: 'red'}} onPress={() => {navigate(Route.PRODUCT_UPDATE)}} />*/}
    </View.V>
  );
});
