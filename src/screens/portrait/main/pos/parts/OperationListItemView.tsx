import {FC, memo, useEffect, useState} from 'react';
import {Operation} from '@src/business';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import {CONSTANTS, DateTimeUtils} from '@core/common';
type Props = {
  operation: Operation;
  index: number;
  onPress: () => void;
};
export const OperationListItemView: FC<Props> = memo(
  ({operation, index, onPress}: Props) => {
    const [time, setTime] = useState<number>(DateTimeUtils.now);
    useEffect(() => {
      const timer = setInterval(() => {
        setTime(DateTimeUtils.now);
      }, 1000);
      return () => clearInterval(timer);
    }, []);
    const donePercent: number = !operation.estimation ? 0 : (operation.estimation - operation.createdAt)
    return (
      <View.Row
        style={[
          styles.container,
          {
            backgroundColor:
              index % 2 === 0 ? 'rgba(234,252,234,0.37)' : 'white',
          },
        ]}
        onPress={onPress}>
        <Label.T text={operation.name || 'No name'} />
      </View.Row>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: '100%',
    borderWidth: 1,
    borderColor: 'green',
  },
});
