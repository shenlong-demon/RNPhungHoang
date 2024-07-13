import {FC, ReactNode} from 'react';
import ViewBase, {ViewBaseProps} from '@core/components/viewbase/ViewBase';
import {ViewRow} from '@core/components/viewbase/ViewRow';

interface Props extends ViewBaseProps {
  children: ReactNode;
}
interface ViewType extends FC<Props> {
  V: typeof ViewBase;
  Row: typeof ViewRow;
}
const View: ViewType = (({children}) => {
  return <>{children}</>;
}) as ViewType;

View.V = ViewBase;
View.Row = ViewRow;
export default View;
