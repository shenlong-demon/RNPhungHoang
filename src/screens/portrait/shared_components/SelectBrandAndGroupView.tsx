import React, {FC, useCallback, useEffect, useState} from "react";
import {Label, View} from "@core/components";
import {Dropdown} from "react-native-element-dropdown";
import {Brand, Group, useDataContext} from "@src/business";
import {StyleSheet} from "react-native";
type Props = {
    onChanged : (brand: Brand | null, group: Group | null) => void;
};
export const SelectBrandAndGroupView: FC<Props> = ({onChanged }) => {
    const {brands, groups} = useDataContext();
    const [brand, setBrand] = useState<Brand | null>(null);
    const [group, setGroup] = useState<Group | null>(null);

    const renderBrandItem = useCallback((brand: Brand | null) => {
        return <View.Row>
            <Label.T text={brand?.name || ''} />
        </View.Row>
    }, []);
    const renderGroupItem = useCallback((group: Group | null) => {
        return <View.Row>
            <Label.T text={group?.name || ''} />
        </View.Row>
    }, []);
    useEffect(() => {
        onChanged(brand, group);
    }, [brand, group]);

    return <View.Row>
        <Dropdown
            style={styles.dropdown}
            data={brands}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder="Select brand"
            searchPlaceholder="Search..."
            value={null}
            onChange={item => {
                setBrand(item);
            }}
            renderItem={renderBrandItem}
        />
        <Dropdown
            style={styles.dropdown}
            data={groups}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder="Select group"
            searchPlaceholder="Search..."
            value={null}
            onChange={item => {
                setGroup(item);
            }}
            renderItem={renderGroupItem}
        />
    </View.Row>
};

const styles = StyleSheet.create({
    dropdown: {
        flex: 1,
        height: 50,
        marginLeft: 10,
        marginRight: 10
    }
});
