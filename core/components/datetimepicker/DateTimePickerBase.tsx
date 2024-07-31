import React, {FC, memo, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import {ViewBaseProps} from '@core/components/viewbase/ViewBase';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {DateTimeUtils, Logger} from '@core/common';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type DateTimePickerBaseProps = ViewBaseProps & {
  textStyle?: StyleProp<TextStyle>;
  defaultValue?: Date | null;
  onChange: (newDate: Date) => void;
};
enum MODE {
  DATE = 'date',
  TIME = 'time',
}
export const DateTimePickerBase: FC<DateTimePickerBaseProps> = memo(
  ({
    defaultValue,
    onChange,
    textStyle,
    style,
    ...rest
  }: DateTimePickerBaseProps) => {
    const [datetime, setDatetime] = useState<Date>(defaultValue || new Date());
    const [showMode, setShowMode] = useState<MODE | null>(null);
    const prevShowModeRef = useRef<MODE | null>(null);

    const onDateTimeChange = (event: any, selectedDate: any) => {
      Logger.log(() => [
        `DateTimePickerBase onChange ${showMode}`,
        event,
        selectedDate,
      ]);
      // const currentDate = selectedDate;
      setDatetime(selectedDate);

      if (showMode === MODE.DATE) {
        setShowMode(MODE.TIME);
      } else {
        setShowMode(null);
      }
    };

    useEffect(() => {
      if (showMode !== prevShowModeRef.current) {
        showDateTimePicker();
      } else if (showMode === MODE.TIME) {
        onChange(datetime);
      }
      prevShowModeRef.current = showMode;
    }, [datetime, showMode]);
    const showDateTimePicker = (): void => {
      if (!showMode) {
        return;
      }
      DateTimePickerAndroid.open({
        value: datetime,
        onChange: (event, selectedData) =>
          onDateTimeChange(event, selectedData),
        mode: showMode,
        is24Hour: true,
      });
    };
    const open = (): void => {
      setShowMode(MODE.DATE);
    };
    const dateStr: string = DateTimeUtils.formatDateTimeString(datetime);
    const labelStyles = StyleSheet.flatten([styles.text, textStyle || {}]);
    const containerStyle = StyleSheet.flatten([styles.container, style]);
    return (
      <View.V {...rest} style={containerStyle} onPress={open}>
        <Label.T style={labelStyles} text={dateStr} />
      </View.V>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  common: {
    flex: 1,
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingTop: 20,
  },
  text: {
    fontWeight: 'bold'
  },
});
