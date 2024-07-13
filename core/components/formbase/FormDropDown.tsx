import React, {FC, memo} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import View from '@core/components/viewbase/View';
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import Label from '@core/components/labelbase/Label';
import {CONSTANTS} from '@core/common';
import {DropdownBaseProps} from '@core/components/dropdownbase/DropDownBase';
import {DropDown} from '@core/components/dropdownbase';

type Props = DropdownBaseProps &
  UseControllerProps & {
    containerStyle?: ViewStyle;
    label?: string;
    selectedProperty?: string;
  };
export const FormDropDown: FC<Props> = memo(
  ({
    label,
    name,
    rules,
    defaultValue,
    containerStyle,
    selectedProperty,
    ...rest
  }: Props) => {
    const {
      field: {onChange, value},
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

    const containerStyles = StyleSheet.flatten([
      styles.container,
      containerStyle,
    ]);

    return (
      <View.Row style={containerStyles}>
        {!!label && (
          <Label.Field
            style={hasError ? {color: 'red'} : {marginLeft: -10}}
            text={!!message ? message : label}
          />
        )}
        <DropDown.Single
          onChange={(item: any | null) => {
            !selectedProperty || selectedProperty === 'all'
              ? onChange(item)
              : onChange(!!item ? item[selectedProperty] : null);
          }}
          value={value}
          defaultValue={value}
          // defaultValue={value}
          {...rest}
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
    paddingBottom: -10
  },
});
