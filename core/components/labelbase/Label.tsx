import {FC, ReactNode} from 'react';
import {ViewBaseProps} from '@core/components/viewbase/ViewBase';
import {LabelBase} from '@core/components/labelbase/LabelBase';
import FieldLabel from '@core/components/labelbase/FieldLabel';
import { MoneyLabel } from "@core/components/labelbase/MoneyLabel";

interface Props extends ViewBaseProps {
  children: ReactNode;
}
interface LabelType extends FC<Props> {
  T: typeof LabelBase;
  Money: typeof MoneyLabel;
  Field: typeof FieldLabel;
}
const View: LabelType = (({children}) => {
  return <>{children}</>;
}) as LabelType;

View.T = LabelBase;
View.Field = FieldLabel;
View.Money = MoneyLabel;
export default View;
