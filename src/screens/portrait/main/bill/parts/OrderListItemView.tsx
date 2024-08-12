import { Order } from '@src/business';
import { FC, memo } from 'react';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import { StyleSheet } from 'react-native';

type Props = {
  item: Order;
  index: number;
};
export const OrderListItemView: FC<Props> = memo(({ item, index }: Props) => {
  const quantityStr: string = !!item.product
    ? `${item.quantity} x ${item.price}`
    : `${item.price}`;
  return (
    <View.Row
      style={{
        backgroundColor: index % 2 === 0 ? 'rgba(234,252,234,0.37)' : 'white',
      }}>
      <Label.T style={styles.name} text={item.name} />
      <Label.T style={styles.quantity} text={quantityStr} />
      <Label.Money style={styles.total} value={item.total} />
    </View.Row>
  );
});
const styles = StyleSheet.create({
  name: { flex: 4 },
  quantity: { flex: 4 },
  total: { flex: 3 },
});
