import {FC, ReactNode} from 'react';
import FlatListBase, {
  FlatListBaseProps,
} from '@core/components/flatlistbase/FlatListBase';

interface Props extends FlatListBaseProps {
  children: ReactNode;
}
interface ViewType extends FC<Props> {
  L: typeof FlatListBase;
}
export const FlatList: ViewType = (({children}) => {
  return <>{children}</>;
}) as ViewType;

FlatList.L = FlatListBase;
