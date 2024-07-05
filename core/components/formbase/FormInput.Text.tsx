import {InputBaseProps} from '@core/components/inputbase/InputBase';
import React, {FC, memo} from 'react';
import {UseControllerProps} from 'react-hook-form/dist/types/controller';
import {ViewStyle} from 'react-native';
import View from '@core/components/viewbase/View';
import Input from '@core/components/inputbase/Input';
import {useController} from 'react-hook-form';

type Props = InputBaseProps &
  UseControllerProps & {
    containerStyle?: ViewStyle;
    label?: string;
  };
export const FormInputText: FC<Props> = memo(
  ({
    name,
    rules,
    defaultValue,
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
    return (
      <View.V style={containerStyle}>
        <Input.T
          {...rest}
          style={style}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
        />
      </View.V>
    );
  },
);
