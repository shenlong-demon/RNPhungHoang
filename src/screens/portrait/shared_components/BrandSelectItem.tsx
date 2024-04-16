import React, {FC, memo} from "react";
import {Brand, Group} from "@src/business";
import {Label, View} from "@core/components";
type Props = {
    brand: Brand | null;
}
const BrandSelectItem : FC<Props> = ({brand}) => {
    return <View.Row>
        <Label.T text={brand?.name || ''} />
    </View.Row>
};

export default memo(BrandSelectItem);
