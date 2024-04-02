import React, {FC, memo} from 'react';
import {Button, Label, View} from '@core/components';
import {Product, STATUS} from '@src/business';
import button from "@core/components/button/Button";

type Props = {
  item: Product;
  index: number;

  onClick: () => void;
};


export const ProductListItem: FC<Props> = ({item, index, onClick}) => {
  return (
    <View.Row>
      <View.Row>
        <Label.T text={item.name} />
        <Label.T text={`${item.quantity}`} />
      </View.Row>
      <View.V>
        <Button.B onPress={onClick} label={'Edit'} />
      </View.V>
    </View.Row>
  );
};
export default memo(ProductListItem);
