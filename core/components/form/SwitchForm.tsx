import React, { FC, memo } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { Label, Switch, View } from '@core/components';
import { BaseFormProps } from '@core/components/form/Form';

type SwitchFormProps = BaseFormProps & {} & UseControllerProps;
const InputTextForm: FC<SwitchFormProps> = (props: SwitchFormProps) => {
  const { name, rules, label, defaultValue, ...inputProps } = props;
  const { field } = useController({ ...props, defaultValue: props.defaultValue });
  const isEmpty: boolean = !field.value;

  return (
    <View.V style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {!!label ? <Label.Field text={label} /> : null}
      <Switch.Normal {...props} value={field.value} onChange={field.onChange} />
    </View.V>
  );
};
export default memo(InputTextForm);
