import React, {FC, memo, useEffect, useMemo, useState} from 'react';
import {StyleProp, StyleSheet, ViewStyle,} from 'react-native';
import {useFormContext} from "react-hook-form";
import {Dropdown} from "react-native-element-dropdown";

export type DropdownProps = {
    data: any[];
    labelField: string;
    valueField: string;
    placeholder?: string;

    isSearch?: boolean;
    searchPlaceholder?: string;

    renderItem: (item: any) => any;
    defaultValue?: any | null | undefined
    style?: StyleProp<ViewStyle>;

    onChange?: (newValue: any | null) => void;
};
const ElementDropdown: FC<DropdownProps> = (props: DropdownProps) => {
    const [value, setValue] = useState<any | null>(props.defaultValue || null);
    const finalStyles = useMemo((): StyleProp<ViewStyle> => {
        return StyleSheet.flatten([commonStyle.view, props.style || {}]);
    }, [props.style]);

    useEffect(() => {
        !!props.onChange && props.onChange(value);
    } , [value]);

    return <Dropdown
        mode={'modal'}
        maxHeight={300}
        style={finalStyles}
        data={props.data}
        search={!!props.isSearch}
        labelField={props.labelField}
        valueField={props.valueField}
        placeholder={props.placeholder}
        searchPlaceholder={props.searchPlaceholder}
        value={value}
        onChange={item => {
            setValue(item);
        }}
        renderItem={props.renderItem}
    />;
};

export default memo(ElementDropdown);

const commonStyle = StyleSheet.create({
    view: {
        flex:1,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        paddingRight: 10,
        paddingLeft: 10
    },

});
