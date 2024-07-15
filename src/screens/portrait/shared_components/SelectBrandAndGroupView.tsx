import React, {FC, useCallback, useEffect, useState} from 'react';
import {Brand, Group, useDataContext} from '@src/business';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import {DropDown} from '@core/components/dropdownbase';

type Props = {
  defaultValues?: {brand: Brand | null; group: Group | null};
  onChanged: (brand: Brand | null, group: Group | null) => void;
};
export const SelectBrandAndGroupView: FC<Props> = ({
  defaultValues,
  onChanged,
}) => {
  const {brands, groups} = useDataContext();
  const [brand, setBrand] = useState<Brand | null>(
    defaultValues?.brand || null,
  );
  const [group, setGroup] = useState<Group | null>(
    defaultValues?.group || null,
  );

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
    <View.Row style={styles.container}>
      <DropDown.Single
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
        onChange={setBrand}
        renderItem={renderBrandItem}
      />
      <DropDown.Single
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
        onChange={setGroup}
        renderItem={renderGroupItem}
      />
    </View.Row>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  dropdown: {},
});
