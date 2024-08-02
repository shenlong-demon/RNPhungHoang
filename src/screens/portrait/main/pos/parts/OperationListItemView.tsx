import {FC, memo, useEffect, useMemo, useState} from 'react';
import {Operation} from '@src/business';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import {CONSTANTS, DateTimeUtils, Logger} from '@core/common';
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
      }, 10000);
      return () => clearInterval(timer);
    }, []);
    const donePercent = useMemo((): number => {
      if (!operation.estimation) {
        return 0;
      }
      const total: number = operation.estimation - operation.createdAt;
      if (total <= 0) {
        return 1;
      }
      const unit: number = 100 / total;
      const percent: number = ((time - operation.createdAt) * unit) / 100;
      // Logger.log(() => [
      //   `OperationListItemView ${operation.name} unit ${unit}  done ${percent}`,
      // ]);
      return percent;
    }, [time]);

    return (
      <View.V>
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
        <View.V style={{height: 5, flexDirection: 'row'}}>
          <View.V style={{flex: donePercent, backgroundColor: 'red'}} />
          <View.V style={{flex: 1 - donePercent, backgroundColor: 'green'}} />
        </View.V>
      </View.V>
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
