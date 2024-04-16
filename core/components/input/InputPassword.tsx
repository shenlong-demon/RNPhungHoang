import React, { FC, memo } from 'react';
import InputText, { InputTextProps } from './InputText';

const InputPassword: FC<InputTextProps> = (props) => {
  return <InputText {...props} secureTextEntry={true} />;
};
export default memo(InputPassword);
