import {Customer} from '@src/business';
import {FC, memo} from 'react';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import {StyleSheet} from 'react-native';

type Props = {
  item: Customer;
  index: number;
  onPress: () => void;
};

export const CustomerListItemView: FC<Props> = memo(
  ({item, onPress}: Props) => {
    return (
      <View.V style={[styles.container]} onPress={onPress}>
        <View.Row>
          <Label.T style={styles.name} text={item.name} />
        </View.Row>
        <View.Row>
          <Label.T text={item.phone} />
          <Label.T text={item.nickName} />
        </View.Row>
      </View.V>
    );
  },
);
const styles = StyleSheet.create({
  container: {},
  name: {
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});
