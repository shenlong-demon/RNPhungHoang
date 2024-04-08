import React, {FC, useState} from 'react';
import {Button, Input, Label, View} from '@core/components';
import {SelectBrandAndGroupView} from "@src/screens/portrait/shared_components";
import {Brand, Group, Product, STATUS} from "@src/business";
import {useNavigation} from "@core/navigation";
import {CONSTANTS} from "@core/common";

type Props = {};
export const UpdateProductScreen: FC<Props> = (({}) => {
    const {getParam} = useNavigation();
    const productParam: Product | null = getParam();
    const [product, setProduct] = useState<Product | null>(productParam || {
        id: CONSTANTS.STR_EMPTY,
        name: CONSTANTS.STR_EMPTY,
        otherName: CONSTANTS.STR_EMPTY,
        quantity: 0,
        price: 0,
        groupId: 0,
        group: null,
        brandId: 0,
        brand: null,
        status: STATUS.ACTIVE
    });


    const onBrandAndGroupChange = (brand: Brand | null, group: Group | null): void => {

    }

    return <View.V>
        <View.Row>
            <Label.T text={'Name'} />
            <Input.Text />
        </View.Row>
        <View.Row>
            <Label.T text={'Code'} />
            <Input.Text />
        </View.Row>

        <SelectBrandAndGroupView defaultValues={{brand: product?.brand || null, group: product?.group || null}} onChanged={onBrandAndGroupChange}/>

        <View.Row>
            <Label.T text={'Price'} />
            <Input.Text />
        </View.Row>
        <View.Row>
            <Label.T text={'Quantity'} />
            <Input.Text />
        </View.Row>



        <Button.Submit />
    </View.V>;
});
