import React, { FC, useCallback, useEffect, useState } from 'react';
import { Label, View } from '@core/components';
import { Dropdown } from 'react-native-element-dropdown';
import { Brand, Group, useDataContext } from '@src/business';
import { StyleSheet } from 'react-native';

type Props = {
  defaultValues?: { brand: Brand | null; group: Group | null };
  onChanged: (brand: Brand | null, group: Group | null) => void;
};
export const SelectBrandAndGroupView: FC<Props> = ({ defaultValues, onChanged }) => {
  const { brands, groups } = useDataContext();
  const [brand, setBrand] = useState<Brand | null>(defaultValues?.brand || null);
  const [group, setGroup] = useState<Group | null>(defaultValues?.group || null);

  useEffect(() => {
    onChanged(brand, group);
  }, [brand, group]);

  const renderBrandItem = useCallback((brand: Brand | null) => {
    return (
      <View.Row>
        <Label.T text={brand?.name || ''} />
      </View.Row>
    );
  }, []);
  const renderGroupItem = useCallback((group: Group | null) => {
    return (
      <View.Row>
        <Label.T text={group?.name || ''} />
      </View.Row>
    );
  }, []);

  return (
    <View.Row>
      <Dropdown
        mode={'modal'}
        style={styles.dropdown}
        data={brands}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder="Select brand"
        searchPlaceholder="Search..."
        value={brand}
        onChange={(item) => {
          setBrand(item);
        }}
        renderItem={renderBrandItem}
      />
      <Dropdown
        mode={'modal'}
        style={styles.dropdown}
        data={groups}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder="Select group"
        searchPlaceholder="Search..."
        value={group}
        onChange={(item) => {
          setGroup(item);
        }}
        renderItem={renderGroupItem}
      />
    </View.Row>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
  },
});
