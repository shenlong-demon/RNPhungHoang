import {FC, memo, useState} from 'react';
import View from '@core/components/viewbase/View';
import {StyleSheet} from 'react-native';
import {DateTimePicker, FlatList} from '@core/components';
import Button from '@core/components/buttonbase/Button';
import {DateTimeUtils} from '@core/common';
import {CloseOutReport, useCloseOutReportFacade} from '@src/business';
import Label from '@core/components/labelbase/Label';
import {DISPLAY_MODE} from '@core/components/datetimepicker/DateTimePickerBase';

type Props = {};
export const CloseOutReportScreen: FC<Props> = memo(({}: Props) => {
  const [selectedDate, setSelectedDate] = useState<number>(DateTimeUtils.now());
  const {doCloseOutReport} = useCloseOutReportFacade();
  const calcCloseoutReport = async (): Promise<void> => {
    doCloseOutReport(selectedDate);
  };
  const renderItem = (data: {item: CloseOutReport; index: number}): any => {
    return <></>;
  };
  return (
    <View.V style={styles.container}>
      <View.Row style={styles.actionView}>
        <Label.T text={'Report by date'} />
        <DateTimePicker.DT
          mode={DISPLAY_MODE.DATE}
          onChange={setSelectedDate}
        />
        <Button.Submit style={styles.btn} onPress={calcCloseoutReport} />
      </View.Row>
      <FlatList.L style={styles.list} data={[]} renderItem={renderItem} />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  actionView: {
    borderColor: 'green',
    borderWidth: 1,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  list: {
    flex: 1,
  },
  btn: {
    minWidth: 100,
  },
});
