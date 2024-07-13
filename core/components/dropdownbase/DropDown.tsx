import {FC, ReactNode} from 'react';
import {
  DropDownBase,
  DropdownBaseProps,
} from '@core/components/dropdownbase/DropDownBase';

interface Props extends DropdownBaseProps {
  children: ReactNode;
}
interface DropDownType extends FC<Props> {
  Single: typeof DropDownBase;
}
export const DropDown: DropDownType = (({children}) => {
  return <>{children}</>;
}) as DropDownType;

DropDown.Single = DropDownBase;
