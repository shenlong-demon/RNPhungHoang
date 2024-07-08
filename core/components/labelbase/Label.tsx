import {FC, ReactNode} from 'react';
import {ViewBaseProps} from '@core/components/viewbase/ViewBase';
import {LabelBase} from '@core/components/labelbase/LabelBase';
import FieldLabel from '@core/components/labelbase/FieldLabel';

interface Props extends ViewBaseProps {
  children: ReactNode;
}
interface LabelType extends FC<Props> {
  T: typeof LabelBase;
  Field: typeof FieldLabel;
}
const View: LabelType = (({children}) => {
  return <>{children}</>;
}) as LabelType;

View.T = LabelBase;
View.Field = FieldLabel;
export default View;
