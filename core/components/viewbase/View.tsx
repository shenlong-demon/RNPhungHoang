import {FC, ReactNode} from 'react';
import ViewBase, {ViewBaseProps} from '@core/components/viewbase/ViewBase';

interface Props extends ViewBaseProps {
  children: ReactNode;
}
interface ViewType extends FC<Props> {
  V: typeof ViewBase;
}
const View: ViewType = (({children}) => {
  return <>{children}</>;
}) as ViewType;

View.V = ViewBase;
export default View;
