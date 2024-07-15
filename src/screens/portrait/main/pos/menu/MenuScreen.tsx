import {FC, memo, useState} from 'react';
import View from '@core/components/viewbase/View';
import {StyleSheet} from 'react-native';
import {SelectBrandAndGroupView} from '@src/screens/portrait/shared_components';
import {Brand, Group, Product, useDataContext} from '@src/business';
import {FlatList} from '@core/components';
import Input from '@core/components/inputbase/Input';
type Props = {};
export const MenuScreen: FC<Props> = memo(({}: Props) => {
  const {products} = useDataContext();
  const [searchProducts, setSearchProducts] = useState<Product[]>(
    products.slice(0, 10),
  );

  const onBrandAndGroupChanged = async (
    brand: Brand | null,
    group: Group | null,
  ): Promise<void> => {};
  const renderItem = (data: {item: Product; index: number}): any => {

  };
  return (
    <View.V style={styles.container}>
      <SelectBrandAndGroupView onChanged={onBrandAndGroupChanged} />
      <Input.T
        style={styles.searchText}
        placeholder={'Please input text to search'}
        autoFocus={true}
      />
      <FlatList.L
        style={styles.list}
        data={searchProducts}
        renderItem={renderItem}
      />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  searchText: {},
});
