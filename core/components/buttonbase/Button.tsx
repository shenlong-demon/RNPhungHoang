import {FC, ReactNode} from 'react';
import FloatCircleButton from '@core/components/buttonbase/FloatCircleButton';
import {ButtonBaseProps} from '@core/components/buttonbase/ButtonBase';

type Props = ButtonBaseProps & {
  children: ReactNode;
};
interface ButtonType extends FC<Props> {
  FloatCircle: typeof FloatCircleButton;
}
const Button: ButtonType = (({children}) => {
  return <>{children}</>;
}) as ButtonType;

Button.FloatCircle = FloatCircleButton;
export default Button;
