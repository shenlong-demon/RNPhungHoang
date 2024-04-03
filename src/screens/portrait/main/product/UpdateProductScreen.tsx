import React, {FC} from 'react';
import {Button, Input, Label, View} from '@core/components';
import {SelectBrandAndGroupView} from "@src/screens/portrait/shared_components";
import {Brand, Group} from "@src/business";

type Props = {};
export const UpdateProductScreen: FC<Props> = (({}) => {

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
        <View.Row>
            <Label.T text={'Price'} />
            <Input.Text />
        </View.Row>
        <View.Row>
            <Label.T text={'Quantity'} />
            <Input.Text />
        </View.Row>

        <SelectBrandAndGroupView onChanged={onBrandAndGroupChange}/>


        <Button.Submit />
    </View.V>;
});
