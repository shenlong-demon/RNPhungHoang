import {FC, memo} from 'react';
import {OperationItem} from '@src/business';
import { Image, View } from "@core/components";
import Button from "@core/components/buttonbase/Button";
type Props = {
  item: OperationItem;
  index: number;
};
export const OperationItemView: FC<Props> = memo(({item, index}: Props) => {
  return <View.V>
    <Image.I />
  </View.V>;
});
