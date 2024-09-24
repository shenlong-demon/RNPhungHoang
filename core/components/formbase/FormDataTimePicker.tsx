import React, { FC, memo } from 'react';
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import { DateTimePickerBaseProps } from '@core/components/datetimepicker/DateTimePickerBase';
import { DateTimePicker } from '@core/components';
import Label from '@core/components/labelbase/Label';
import View from '@core/components/viewbase/View';
import { CONSTANTS } from '@core/common';
import { StyleSheet, ViewStyle } from 'react-native';

type FormDateTimePickerProps = Omit<DateTimePickerBaseProps, 'onChange'>;

type Props = FormDateTimePickerProps &
  UseControllerProps & {
    containerStyle?: ViewStyle;
    label?: string;
  };

export const FormDateTimePicker: FC<Props> = memo(
  ({ containerStyle, label, name, rules, defaultValue, ...rest }: Props) => {
    const {
      field: { onChange, onBlur, value },
      // fieldState: {error},
    } = useController({
      name,
      rules,
      defaultValue,
    });
    const { formState } = useFormContext();
    const hasError = Boolean(formState?.errors[name]);
    const message: string = !!hasError
      ? `${formState.errors[name]?.message}`
      : CONSTANTS.STR_EMPTY;

    const containerStyles = StyleSheet.flatten([
      styles.container,
      containerStyle,
    ]);

    const dropdownStyle = StyleSheet.flatten([styles.commonDropdownStyle]);
    return (
      <View.Row style={containerStyles}>
        {!!label && (
          <Label.Field
            style={hasError ? { color: 'red' } : {}}
            text={!!message ? message : label}
          />
        )}
        <DateTimePicker.DT
          // onChangeEvent={onChange}
          {...rest}
          onChange={(newDate: number) => {
            onChange(newDate);
          }}
          defaultValue={defaultValue}
          // defaultValue={isNaN(Number(value)) ? 0 : Number(value)}
        />
      </View.Row>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'yellow',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'gray',
    // justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    verticalAlign: 'middle',
    // paddingTop: 30,
    // marginTop: -20,
    // marginBottom: 20,
  },
  commonDropdownStyle: {
    borderBottomWidth: 0,
    // paddingTop: -20,
  },
});
