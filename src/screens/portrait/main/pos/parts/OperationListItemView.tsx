import {FC, memo} from 'react';
import {Operation} from '@src/business';
import {Label} from '@core/components';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
type Props = {
  operation: Operation;
  index: number;
  onPress: () => void;
};
export const OperationListItemView: FC<Props> = memo(
  ({operation, index, onPress}: Props) => {
    return (
      <View.V style={styles.container} onPress={onPress}>
        <View.V></View.V>
        <View.V>
          <Label.T text={operation.name} />
          <Label.T text={operation.customer?.name} />
        </View.V>
        <View.V></View.V>
      </View.V>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
  },
});
