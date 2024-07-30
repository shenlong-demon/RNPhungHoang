import {InputBaseProps} from '@core/components/inputbase/InputBase';
import React, {FC, memo} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import View from '@core/components/viewbase/View';
import Input from '@core/components/inputbase/Input';
import {
  useController,
  useFormContext,
  UseControllerProps,
} from 'react-hook-form';
import Label from '@core/components/labelbase/Label';
import {CONSTANTS} from '@core/common';

type Props = InputBaseProps &
  UseControllerProps & {
    containerStyle?: ViewStyle;
    label?: string;
  };
export const FormInputText: FC<Props> = memo(
  ({
    label,
    name,
    rules,
    defaultValue,
    multiline,
    // label,
    style,
    containerStyle,
    ...rest
  }: Props) => {
    const {
      field: {onChange, onBlur, value},
      // fieldState: {error},
    } = useController({
      name,
      rules,
      defaultValue,
    });
    const {formState} = useFormContext();
    const hasError = Boolean(formState?.errors[name]);
    const message: string = !!hasError
      ? `${formState.errors[name]?.message}`
      : CONSTANTS.STR_EMPTY;
    const textStyles = StyleSheet.flatten([
      styles.common,
      multiline
        ? {
            marginTop: 5,
          }
        : {},
      style,
      hasError ? {borderColor: 'red'} : {},
    ]);
    return (
      <View.V style={containerStyle}>
        {!!label && (
          <Label.Field
            style={hasError ? {color: 'red'} : {}}
            text={!!message ? message : label}
          />
        )}
        <Input.T
          {...rest}
          multiline={multiline}
          style={textStyles}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
        />
      </View.V>
    );
  },
);
const styles = StyleSheet.create({
  common: {
    marginTop: -5,
    marginBottom: 10,
  },
});
