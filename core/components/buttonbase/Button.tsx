import {FC, ReactNode} from 'react';
import FloatCircleButton from '@core/components/buttonbase/FloatCircleButton';
import {ButtonBaseProps} from '@core/components/buttonbase/ButtonBase';
import SubmitButton from '@core/components/buttonbase/SubmitButton';
import {CancelButton} from '@core/components/buttonbase/CancelButton';

type Props = ButtonBaseProps & {
  children: ReactNode;
};
interface ButtonType extends FC<Props> {
  Submit: typeof SubmitButton;
  Cancel: typeof CancelButton;
  FloatCircle: typeof FloatCircleButton;
}
const Button: ButtonType = (({children}) => {
  return <>{children}</>;
}) as ButtonType;

Button.FloatCircle = FloatCircleButton;
Button.Submit = SubmitButton;
Button.Cancel = CancelButton;
export default Button;
