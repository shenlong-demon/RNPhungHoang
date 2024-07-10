import React, {FC, memo} from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import {SwitchBaseProps} from '@core/components/switchbase/SwitchBase';
import Switch from '@core/components/switchbase/Switch';

type SwitchFormProps = SwitchBaseProps & {} & UseControllerProps;
export const FormSwitch: FC<SwitchFormProps> = memo(
  ({label, name, rules, defaultValue}: SwitchFormProps) => {
    const {
      field: {onChange, value},
      // fieldState: {error},
    } = useController({
      name,
      rules,
      defaultValue,
    });
    return <Switch.S label={label} value={value} onChange={onChange} />;
  },
);
