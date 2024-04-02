import React, {FC, memo, useEffect} from "react";
import {View} from "@core/components";
import {Product} from "@src/business";
import Label from "@core/components/label/Label";

type Props = {
    item: Product;
    index: number;

    onClick: (item: Product) => void;
};
 const ProductListItem: FC<Props> = ({item, index, onClick }) => {
    useEffect(() => {
    }, []);

    return <View.Row  styles={{flex:1, justifyContent: 'space-between'}}>
        <Label.T text={item.name} />
        <Label.T text={`${item.price}`} />
    </View.Row>
};
 export default memo(ProductListItem);
