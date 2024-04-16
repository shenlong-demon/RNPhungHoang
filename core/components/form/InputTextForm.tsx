import React, {FC, memo} from 'react';
import InputText, {InputTextProps} from '../input/InputText';
import {useController, UseControllerProps, useFormContext} from "react-hook-form";
import {StyleSheet} from "react-native";
import {Input, Label, View} from "@core/components";
import {BaseFormProps} from "@core/components/form/Form";
import {CONSTANTS} from "@core/common";

type InputTextFormProps = BaseFormProps & InputTextProps & {
  defaultValue?: string;
} & UseControllerProps;
const InputTextForm: FC<InputTextFormProps> = (props: InputTextFormProps) => {
  const {
    name,
    rules,
      label,
    defaultValue,
    ...inputProps
  } = props;
  const formContext = useFormContext();
  const { formState } = formContext;
  const { field } = useController({ ...props, defaultValue });
  const hasError = Boolean(formState?.errors[props.name]);
  const message: string = !!hasError ? `${formState.errors[props.name].message}` : CONSTANTS.STR_EMPTY;

  const isEmpty: boolean = !field.value;
  return <View.V>
        {!!label ? <Label.Field text={label} /> : null }
        <Input.Text {...props}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value} {...inputProps} style={hasError ? styles.error : styles.normal}
                    placeholder={inputProps.placeholder || label}
        />
        <Label.Field style={{color: 'red', textAlign: 'right'}} text={message} />
      </View.V>

};
export default memo(InputTextForm);

const styles = StyleSheet.create({
  normal: {},
  error: {
    borderWidth: 1,
    borderColor: 'red',
    borderBottomColor: 'red'
  }
});
