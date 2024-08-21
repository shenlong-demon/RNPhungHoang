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
      <View.V
        onPress={onPress}
        style={{
          flexDirection: 'row',
          backgroundColor: index % 2 === 0 ? 'rgba(234,252,234,0.37)' : 'white',
          borderColor: 'green',
          borderBottomWidth: 1,
        }}>
        <Label.T style={styles.billNo} text={`${item.id}`} />
        <View.V style={[styles.container]}>
          <View.Row style={{}}>
            <Label.T style={styles.name} text={item.name || 'No name'} />
            <Label.T
              style={styles.date}
              text={DateTimeUtils.formatDateTimeString(item.receiptedAt)}
            />
            <Label.Money style={styles.price} value={item.total} />
          </View.Row>
          {!!item.customer ? (
            <View.V style={styles.customerContainer}>
              <Label.T
                style={styles.customerName}
                text={`${item.customer.name} - ${item.customer.phone}`}
              />
            </View.V>
          ) : null}
        </View.V>
      </View.V>
    );
  },
);
const styles = StyleSheet.create({
  container: { flex: 1 },
  billNo: {
    width: 70,
    fontWeight: 'bold',
  },
  name: {
    flex: 4,
    fontWeight: 'bold',
  },
  customerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  customerName: {
    flex: 1,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'right',
  },
  date: {
    flex: 4,
  },
  price: {
    flex: 4,
    textAlign: 'right',
    fontWeight: 'bold',
  },
});
