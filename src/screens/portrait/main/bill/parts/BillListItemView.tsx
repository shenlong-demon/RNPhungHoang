import { Bill } from '@src/business';
import { FC, memo } from 'react';
import View from '@core/components/viewbase/View';
import { StyleSheet } from 'react-native';
import Label from '@core/components/labelbase/Label';
import { DateTimeUtils } from '@core/common';

type Props = {
  item: Bill;
  index: number;
  onPress: () => void;
};
export const BillListItemView: FC<Props> = memo(
  ({ item, index, onPress }: Props) => {
    return (
      <View.Row
        onPress={onPress}
        style={[
          styles.container,
          {
            backgroundColor:
              index % 2 === 0 ? 'rgba(234,252,234,0.37)' : 'white',
          },
        ]}>
        <Label.T style={styles.billNo} text={`${item.id}`} />
        <Label.T style={styles.name} text={item.name || 'No name'} />
        <Label.T
          style={styles.date}
          text={DateTimeUtils.formatDateTimeString(item.receiptedAt)}
        />
        <Label.Money style={styles.price} value={item.total} />
      </View.Row>
    );
  },
);
const styles = StyleSheet.create({
  container: {},
  billNo: {
    flex: 2,
    marginRight: 5,
  },
  name: {
    flex: 4,
  },
  date: {
    flex: 4,
  },
  price: {
    flex: 4,
    textAlign: 'right',
  },
});
