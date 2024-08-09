import React, { FC, memo, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DropdownProps } from 'react-native-element-dropdown/src/components/Dropdown/model';

export type DropdownBaseProps = Omit<DropdownProps<any>, 'onChange'> & {
  onChange?: ((newValue: any | null) => void) | undefined;
} & {
  data: any[];
  labelField: string;
  valueField: string;
  placeholder?: string;

  isSearch?: boolean;
  searchPlaceholder?: string;

  renderItem: (item: any) => any;
  defaultValue?: any | null | undefined;
  style?: StyleProp<ViewStyle>;
};

export const DropDownBase: FC<DropdownBaseProps> = memo(
  (props: DropdownBaseProps) => {
    const [value, setValue] = useState<any | null>(props.defaultValue || null);
    const finalStyles = StyleSheet.flatten([styles.common, props.style || {}]);

    useEffect(() => {
      !!props.onChange && props.onChange(value);
    }, [value]);

    return (
      <Dropdown
        {...props}
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
        onChange={setValue}
        renderItem={props.renderItem}
        selectedTextStyle={{
          fontWeight: 'bold',
          fontSize: 18,
          textAlign: 'right',
        }}
      />
    );
  },
);

const styles = StyleSheet.create({
  common: {
    flex: 1,
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'gray',
    // paddingTop: 20,
    // backgroundColor: 'red',
  },
});
