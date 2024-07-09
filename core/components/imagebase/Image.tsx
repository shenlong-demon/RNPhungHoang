import {FC, ReactNode} from 'react';
import ImageBase, {ImageBaseProps} from '@core/components/imagebase/ImageBase';

interface Props extends ImageBaseProps {
  children: ReactNode;
}
interface ImageType extends FC<Props> {
  I: typeof ImageBase;
}
const Image: ImageType = (({children}) => {
  return <>{children}</>;
}) as ImageType;

Image.I = ImageBase;
export default Image;
