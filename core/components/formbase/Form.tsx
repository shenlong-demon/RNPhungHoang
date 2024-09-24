import { FC, ReactNode } from 'react';
import { FormInputText } from '@core/components/formbase/FormInput.Text';
import { FormView } from '@core/components/formbase/FormView';
import { FormSubmitButton } from '@core/components/formbase/FormSubmitButton';
import { FormImage } from '@core/components/formbase/FormImage';
import { FormSwitch } from '@core/components/formbase/FormSwitch';
import { FormDropDown } from '@core/components/formbase/FormDropDown';
import { FormDateTimePicker } from '@core/components/formbase/FormDataTimePicker';

interface Props {
  children: ReactNode;
}

interface FormType extends FC<Props> {
  Input: typeof FormInputText;
  View: typeof FormView;
  SubmitButton: typeof FormSubmitButton;
  Image: typeof FormImage;
  Switch: typeof FormSwitch;
  DropDown: typeof FormDropDown;
  DateTimePicker: typeof FormDateTimePicker;
}

const Form: FormType = (({ children }) => {
  return <>{children}</>;
}) as FormType;

Form.Input = FormInputText;
Form.View = FormView;
Form.SubmitButton = FormSubmitButton;
Form.Image = FormImage;
Form.Switch = FormSwitch;
Form.DropDown = FormDropDown;
Form.DateTimePicker = FormDateTimePicker;
export default Form;
