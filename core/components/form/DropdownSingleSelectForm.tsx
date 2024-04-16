import React, {FC, memo} from 'react';
import {StyleSheet,} from 'react-native';
import {useController, useFormContext} from "react-hook-form";
import {DropdownProps} from "@core/components/dropdown/ElementDropdown";
import {Dropdown} from "@core/components/dropdown";
import {BaseFormProps} from "@core/components/form/Form";

type Props = BaseFormProps & DropdownProps & {
}
const DropdownSingleSelectForm: FC<Props> = (props: Props) => {
    const formContext = useFormContext();
    const { formState } = formContext;
    const { field } = useController({ ...props });
    const hasError = Boolean(formState?.errors[props.name]);

    return (
        <Dropdown.Single {...props} onChange={field.onChange} style={hasError ? commonStyles.error : commonStyles.normal}  />
    );
};

export default memo(DropdownSingleSelectForm);

const commonStyles = StyleSheet.create({
    normal: {},

    error: {
        borderWidth: 1,
        borderColor: 'red',
        borderBottomColor: 'red'
    }
});
