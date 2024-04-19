import React, { FC, memo, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { ElementDropdownProps } from '@core/components/dropdown/ElementDropdown';
import { Dropdown } from '@core/components/dropdown';
import { BaseFormProps } from '@core/components/form/Form';

type Props = BaseFormProps &
  Omit<ElementDropdownProps, 'onChange'> & {
    onChange?: undefined;
  } & {
    property?: 'all' | string;
  };
const DropdownSingleSelectForm: FC<Props> = (props: Props) => {
  const formContext = useFormContext();
  const { formState } = formContext;
  const { field } = useController({ ...props });
  const hasError = Boolean(formState?.errors[props.name]);

  const finalStyles = useMemo((): StyleProp<ViewStyle> => {
    return StyleSheet.flatten([hasError ? commonStyles.error : commonStyles.normal, props.style || {}]);
  }, [hasError, props.style]);
  return (
    <Dropdown.Single
      {...props}
      onChange={(item: any) => {
        !props.property || props.property === 'all' ? field.onChange(item) : field.onChange(item[props.property]);
      }}
      style={finalStyles}
    />
  );
};

export default memo(DropdownSingleSelectForm);

const commonStyles = StyleSheet.create({
  normal: {},

  error: {
    borderWidth: 1,
    borderColor: 'red',
    borderBottomColor: 'red',
  },
});
