import React from 'react';
import ViewForm from './ViewForm';
import ButtonSubmitForm from './ButtonSubmitForm';
import InputTextForm from './InputTextForm';
import DropdownSingleSelectForm from './DropdownSingleSelectForm';

export type BaseFormProps = {
  label?: string;
  name: string;
  rules?: any;
};

const Form = () => <React.Fragment />;

Form.View = ViewForm;
Form.ButtonSubmit = ButtonSubmitForm;
Form.InputText = InputTextForm;
Form.SingleDropdown = DropdownSingleSelectForm;

export default Form;
