import {FC, ReactNode} from 'react';
import ImageBase, {ImageBaseProps} from '@core/components/imagebase/ImageBase';

interface Props extends ImageBaseProps {
  children: ReactNode;
}
interface ViewType extends FC<Props> {
  I: typeof ImageBase;
}
const Image: ViewType = (({children}) => {
  return <>{children}</>;
}) as ViewType;

Image.I = ImageBase;
export default Image;
