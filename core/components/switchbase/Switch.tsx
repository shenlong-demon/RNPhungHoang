import {FC, ReactNode} from 'react';
import {
  SwitchBase,
  SwitchBaseProps,
} from '@core/components/switchbase/SwitchBase';

interface Props extends SwitchBaseProps {
  children: ReactNode;
}
interface SwitchType extends FC<Props> {
  S: typeof SwitchBase;
}
const Switch: SwitchType = (({children}) => {
  return <>{children}</>;
}) as SwitchType;

Switch.S = SwitchBase;
export default Switch;
