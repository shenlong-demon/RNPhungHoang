import React from 'react';
import ViewForm from './ViewForm';
import ButtonSubmitForm from './ButtonSubmitForm';
import InputTextForm from './InputTextForm';
import DropdownSingleSelectForm from './DropdownSingleSelectForm';
import SwitchForm from '@core/components/form/SwitchForm';
import ImageForm from '@core/components/form/ImageForm';

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
Form.Switch = SwitchForm;
Form.Image = ImageForm;

export default Form;
