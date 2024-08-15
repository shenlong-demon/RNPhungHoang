import { FC, memo, useEffect, useMemo, useState } from 'react';
import View from '@core/components/viewbase/View';
import { StyleSheet } from 'react-native';
import { DateTimePicker, FlatList } from '@core/components';
import Button from '@core/components/buttonbase/Button';
import { DateTimeUtils, Dto } from '@core/common';
import { CloseOutReport, useCloseOutReportFacade } from '@src/business';
import Label from '@core/components/labelbase/Label';
import { DISPLAY_MODE } from '@core/components/datetimepicker/DateTimePickerBase';

type Props = {};
export const CloseOutReportScreen: FC<Props> = memo(({}: Props) => {
  const [selectedDate, setSelectedDate] = useState<number>(DateTimeUtils.now());
  const [closeOutReports, setCloseOutReports] = useState<CloseOutReport[]>([]);
  const { doCloseOutReport, getCloseOutReportsInMonth } =
    useCloseOutReportFacade();
  const calcCloseoutReport = async (): Promise<void> => {
    await doCloseOutReport(selectedDate);
    loadCloseOutReports();
  };

  useEffect(() => {
    loadCloseOutReports();
  }, [selectedDate]);

  const loadCloseOutReports = async (): Promise<void> => {
    const dto: Dto<CloseOutReport[]> = await getCloseOutReportsInMonth(
      selectedDate,
    );
    if (dto.next()) {
      setCloseOutReports(
        (dto.data || []).sort(
          (r1: CloseOutReport, r2: CloseOutReport): number => {
            return r1.date > r2.date ? 1 : -1;
          },
        ),
      );
    }
  };
  const numberOfBill = useMemo(() => {
    return closeOutReports.reduce(
      (n, r: CloseOutReport) => n + r.numberOfBill,
      0,
    );
  }, [closeOutReports]);

  const totalBill = useMemo(() => {
    return closeOutReports.reduce((n, r: CloseOutReport) => n + r.totalBill, 0);
  }, [closeOutReports]);

  const totalDiscount = useMemo(() => {
    return closeOutReports.reduce(
      (n, r: CloseOutReport) => n + r.totalDiscount,
      0,
    );
  }, [closeOutReports]);
  const totalProfit = useMemo(() => {
    return closeOutReports.reduce(
      (n, r: CloseOutReport) => n + r.totalProfit,
      0,
    );
  }, [closeOutReports]);

  const renderItem = (data: { item: CloseOutReport; index: number }): any => {
    return (
      <View.Row
        style={{
          backgroundColor:
            data.index % 2 === 0 ? 'rgba(234,252,234,0.37)' : 'white',
        }}>
        <Label.T
          style={{ flex: 1, textAlign: 'right' }}
          text={`${new Date(data.item.date).getDate()}`}
        />
        <Label.T
          style={{ flex: 1.5, textAlign: 'right', fontWeight: 'bold' }}
          text={`${
            data.item.numberOfBill === 0 ? '-' : data.item.numberOfBill
          }`}
        />

        <Label.Money
          style={{ flex: 4, textAlign: 'right' }}
          value={data.item.totalBill}
          replaceIfZero={'-'}
        />
        <Label.Money
          style={{ flex: 4, textAlign: 'right', fontWeight: 'bold' }}
          value={data.item.totalProfit}
          replaceIfZero={'-'}
        />
      </View.Row>
    );
  };
  return (
    <View.V style={styles.container}>
      <View.Row style={styles.actionView}>
        <Label.T style={styles.title} text={'Report by date'} />
        <DateTimePicker.DT
          mode={DISPLAY_MODE.DATE}
          onChange={setSelectedDate}
        />
        <Button.Submit style={styles.btn} onPress={calcCloseoutReport} />
      </View.Row>
      <FlatList.L
        style={styles.list}
        data={closeOutReports}
        renderItem={renderItem}
      />
      <View.V>
        <View.Row style={styles.actionView}>
          <Label.T style={styles.title} text={'Number of bill'} />
          <Label.T style={styles.title} text={`${numberOfBill}`} />
        </View.Row>
        <View.Row style={styles.actionView}>
          <Label.T style={styles.title} text={'Discount'} />
          <Label.Money style={styles.title} value={totalDiscount} />
        </View.Row>
        <View.Row style={styles.actionView}>
          <Label.T style={styles.title} text={'Total'} />
          <Label.Money style={styles.title} value={totalBill} />
        </View.Row>
        <View.Row style={styles.actionView}>
          <Label.T style={styles.title} text={'Profit'} />
          <Label.Money style={styles.title} value={totalProfit} />
        </View.Row>
      </View.V>
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
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
    minWidth: 70,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemText: {
    flex: 1,
  },
});
