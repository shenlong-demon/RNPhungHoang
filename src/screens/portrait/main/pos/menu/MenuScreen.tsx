import { FC, memo, useEffect, useState } from 'react';
import View from '@core/components/viewbase/View';
import { StyleSheet } from 'react-native';
import {
  Product,
  STATUS,
  useDataContext,
  useOperationContext,
  useProductSearchFacade,
} from '@src/business';
import { FlatList } from '@core/components';
import Input from '@core/components/inputbase/Input';
import { MenuItemView } from '@src/screens/portrait/main/pos/menu/parts';
import { useNavigation } from '@core/navigation';

type Props = {};
export const MenuScreen: FC<Props> = memo(({}: Props) => {
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<string | null>(null);
  const productSearchFacade = useProductSearchFacade();
  const { products } = useDataContext();
  const { booking } = useOperationContext();
  const { goBack } = useNavigation();
  useEffect(() => {
    setSearchProducts(productSearchFacade.search(searchText, STATUS.ACTIVE));
  }, [searchText, products]);

  const book = async (menuItem: Product): Promise<void> => {
    booking(menuItem);
    goBack();
  };
  const renderItem = (data: { item: Product; index: number }): any => {
    return (
      <MenuItemView
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
