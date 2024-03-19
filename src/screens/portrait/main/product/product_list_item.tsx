import React, {FC, memo} from 'react';
import {Button, Label, View} from '@core/components';
import {Product, STATUS} from '@src/business';
import button from "@core/components/button/Button";

type Props = {
  item: Product;
  index: number;

  onEdit: () => void;
};


export const ProductListItem: FC<Props> = ({item, index, onEdit}) => {
  return (
    <View.V alignChildren={'center|vertical'}>
      <View.V>
        <Label.T text={item.name} />
        <Label.T text={`${item.quantity}`} />
      </View.V>
      <View.V>
        <Button.B onPress={onEdit} label={'Edit'} />
      </View.V>
    </View.V>
  );
};
export default memo(ProductListItem);
