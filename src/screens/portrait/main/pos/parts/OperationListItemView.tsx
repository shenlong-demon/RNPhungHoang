import {FC, memo} from 'react';
import {Operation} from '@src/business';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import {CONSTANTS} from '@core/common';
type Props = {
  operation: Operation;
  index: number;
  onPress: () => void;
};
export const OperationListItemView: FC<Props> = memo(
  ({operation, index, onPress}: Props) => {
    return (
      <View.Row style={[styles.container, {backgroundColor: index % 2 === 0 ? 'rgba(234,252,234,0.37)' : 'white'}]} onPress={onPress}>
        <Label.T text={operation.name || CONSTANTS.STR_EMPTY} />
      </View.Row>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: '100%',
  },
});
