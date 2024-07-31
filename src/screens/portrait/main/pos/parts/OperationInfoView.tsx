import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import {DateTimePicker} from '@core/components';
import {Logger} from '@core/common';
import {useOperationContext} from '@src/business';
import Label from '@core/components/labelbase/Label';

type Props = {};
export const OperationInfoView: FC<Props> = memo(({}: Props) => {
  const {operation, setEstimation} = useOperationContext();
  const onEstimationChanged = (newDate: Date): void => {
    Logger.log(() => [`OperationInfoView estimation changed `, newDate]);
    setEstimation(newDate);
  };
  return (
    <View.V style={styles.container}>
      <View.Row>
        <Label.T text={'Release Estimation'} />
        <DateTimePicker.DT
          defaultValue={operation?.estimation}
          style={styles.datetime}
          textStyle={styles.datetimeText}
          onChange={onEstimationChanged}
        />
      </View.Row>
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  datetime: {
    backgroundColor: 'green',
  },
  datetimeText: {
    color: 'white',
  },
});
