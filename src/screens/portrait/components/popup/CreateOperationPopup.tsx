import {FC, memo} from 'react';
import Form from '@core/components/formbase/Form';
import {Logger} from '@core/common';

type Props = {};
type FormValue = {
  name: string;
};
export const CreateOperationPopup: FC<Props> = memo(({}: Props) => {
  const onSubmit = (data: FormValue): void => {
    Logger.log(() => [`CreateOperationPopup onSubmit`, data]);
  };
  const onError = (errors: any, e: any) => {
    Logger.log(() => [`CreateOperationPopup onError errors`, errors, e]);
    // submitProduct(product)
  };
  return (
    <Form.View
      style={{backgroundColor: 'yellow'}}
      onSubmit={onSubmit}
      onError={onError}>
      <Form.Input name="name" />
      <Form.SubmitButton />
    </Form.View>
  );
});
