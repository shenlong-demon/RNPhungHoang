import {FC, ReactNode} from 'react';
import FloatCircleButton from '@core/components/buttonbase/FloatCircleButton';
import {ButtonBaseProps} from '@core/components/buttonbase/ButtonBase';
import SubmitButton from '@core/components/buttonbase/SubmitButton';

type Props = ButtonBaseProps & {
  children: ReactNode;
};
interface ButtonType extends FC<Props> {
  Submit: typeof SubmitButton;
  FloatCircle: typeof FloatCircleButton;
}
const Button: ButtonType = (({children}) => {
  return <>{children}</>;
}) as ButtonType;

Button.FloatCircle = FloatCircleButton;
Button.Submit = SubmitButton;
export default Button;
