import {Product} from '@src/business';
import {FC, memo} from 'react';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import {StyleSheet} from 'react-native';

type Props = {
  item: Product;
  index: number;
  onPress: () => Promise<void>;
};
export const MenuItemView: FC<Props> = memo(({item, onPress}: Props) => {
  return (
    <View.V style={styles.container} onPress={onPress}>
      <Label.T style={styles.name} text={item.name} />
      <Label.T style={styles.price} text={`${item.price}`} />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(146,234,140,0.95)',
    margin: 5,
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
