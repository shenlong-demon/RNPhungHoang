import {FC, ReactNode} from 'react';
import {FormInputText} from '@core/components/formbase/FormInput.Text';
import {FormView} from '@core/components/formbase/FormView';
import {FormSubmitButton} from '@core/components/formbase/FormSubmitButton';

interface Props {
  children: ReactNode;
}
interface FormType extends FC<Props> {
  Input: typeof FormInputText;
  View: typeof FormView;
  SubmitButton: typeof FormSubmitButton;
}
const Form: FormType = (({children}) => {
  return <>{children}</>;
}) as FormType;

Form.Input = FormInputText;
Form.View = FormView;
Form.SubmitButton = FormSubmitButton;
export default Form;
