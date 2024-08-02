import {FC, memo} from 'react';
import {Booking} from '@src/business';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import {StyleSheet} from 'react-native';

type Props = {
  item: Booking;
  index: number;
  onPress?: () => Promise<void>;
  onLongPress?: () => Promise<void>;
  isSelected?: boolean;
};
export const BookingItemView: FC<Props> = memo(
  ({item, index, onPress, onLongPress, isSelected}: Props) => {
    return (
      <View.V
        style={[
          styles.container,
          {
            backgroundColor: isSelected
              ? 'rgba(165,246,159,0.86)'
              : index % 2 === 0
              ? 'rgba(234,252,234,0.37)'
              : 'white',
          },
        ]}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View.Row>
          <Label.T style={styles.index} text={`${index + 1}`} />
          <Label.T style={styles.name} text={item.name} />
          <Label.T style={styles.quantity} text={`${item.quantity}`} />
          <Label.Money
            style={styles.price}
            value={item.price * item.quantity}
          />
        </View.Row>
        {!!item.note ? (
          <View.V style={{marginLeft: 10, marginTop: -10}}>
            <Label.T text={item.note} />
          </View.V>
        ) : null}
      </View.V>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderColor: 'green',
  },
  name: {
    flex: 0.6,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  index: {
    // backgroundColor: 'red',
  },
  price: {
    flex: 0.3,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  quantity: {
    fontWeight: 'bold',
  },
});
