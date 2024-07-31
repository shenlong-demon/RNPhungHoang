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
  ({item, index, onPress}: Props) => {
    return (
      <View.V
        style={[
          styles.container,
          {
            backgroundColor:
              index % 2 === 0 ? 'rgba(234,252,234,0.37)' : 'white',
          },
        ]}
        onPress={onPress}>
        <View.V style={styles.info}>
          <Label.T style={styles.name} text={`${item.name}`} />
          <Label.T text={item.nickName} />
        </View.V>
        <Label.T text={`${item.phone}`} />
      </View.V>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});
