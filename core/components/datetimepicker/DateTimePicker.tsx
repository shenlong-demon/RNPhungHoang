import {FC, ReactNode} from 'react';
import {DateTimePickerBase} from '@core/components/datetimepicker/DateTimePickerBase';

interface Props {
  children: ReactNode;
}
interface DateTimePickerType extends FC<Props> {
  DT: typeof DateTimePickerBase;
}
export const DateTimePicker: DateTimePickerType = (({children}) => {
  return <>{children}</>;
}) as DateTimePickerType;

DateTimePicker.DT = DateTimePickerBase;
