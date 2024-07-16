import {FC, memo} from 'react';
import {Booking} from '@src/business';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import {StyleSheet} from 'react-native';

type Props = {
  item: Booking;
  index: number;
};
export const BookingItemView: FC<Props> = memo(({item, index}: Props) => {
  return (
    <View.Row style={styles.container}>
      <Label.T text={item.name} />
      <Label.T text={`${item.quantity}`} />
    </View.Row>
  );
});
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
