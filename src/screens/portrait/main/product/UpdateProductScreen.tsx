import React, {FC} from 'react';
import {Button, Input, View} from '@core/components';
import {SelectBrandAndGroupView} from "@src/screens/portrait/shared_components";

type Props = {};
export const UpdateProductScreen: FC<Props> = (({}) => {
    return <View.V>
        <Input.Text />
        <Input.Text />
        <Input.Text />
        <SelectBrandAndGroupView/>
        <Input.Text />
        <Button.Submit />
    </View.V>;
});
