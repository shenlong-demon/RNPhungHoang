import {FC, memo} from 'react';
import Form from '@core/components/formbase/Form';
import {Logger} from '@core/common';
import {StyleSheet} from 'react-native';

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
    <Form.View style={styles.container} onSubmit={onSubmit} onError={onError}>
      <Form.Input name="name" />
      <Form.SubmitButton style={{marginTop: 10}} />
    </Form.View>
  );
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    // flex: 1
    width: '100%',
  },
});
