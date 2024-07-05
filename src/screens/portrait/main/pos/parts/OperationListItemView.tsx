import {FC, memo} from 'react';
import {Operation} from '@src/business';
import {Label, View} from '@core/components';
import {StyleSheet} from 'react-native';
type Props = {
  operation: Operation;
  index: number;
};
export const OperationListItemView: FC<Props> = memo(
  ({operation, index}: Props) => {
    return (
      <View.V style={styles.container}>
        <View.V></View.V>
        <View.V>
          <Label.T text={operation.name} />
          <Label.T text={operation.customer?.name} />
        </View.V>
        <View.V>
          <Label.T text={operation} />
        </View.V>
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
