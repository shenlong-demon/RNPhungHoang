import {FC, ReactNode} from 'react';
import {InputBase, InputBaseProps} from '@core/components/inputbase/InputBase';

interface Props extends InputBaseProps {
  children: ReactNode;
}
interface InputType extends FC<Props> {
  T: typeof InputBase;
}
const Input: InputType = (({children}) => {
  return <>{children}</>;
}) as InputType;

Input.T = InputBase;
export default Input;
