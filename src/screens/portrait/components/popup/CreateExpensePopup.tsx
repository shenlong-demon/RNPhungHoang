import React, { FC, memo } from 'react';
import Form from '@core/components/formbase/Form';
import { CONSTANTS, Logger } from '@core/common';
import { StyleSheet } from 'react-native';
import Button from '@core/components/buttonbase/Button';
import View from '@core/components/viewbase/View';

type Props = {
  onOk: (name: string, price: number) => Promise<void>;
  onCancel: () => void;
};
type FormValue = {
  name: string;
  price: string;
};
export const CreateExpensePopup: FC<Props> = memo(
  ({ onOk, onCancel }: Props) => {
    const onSubmit = async (data: FormValue): Promise<void> => {
      Logger.log(() => [`CreateExpensePopup onSubmit`, data]);
      onOk(data.name, Number(data.price));
    };
    const onError = (errors: any, e: any) => {
      Logger.log(() => [`CreateOperationPopup onError errors`, errors, e]);
      // submitProduct(product)
    };

    return (
      <Form.View style={styles.container} onSubmit={onSubmit} onError={onError}>
        <Form.Input
          rules={{
            // valueAsNumber: true,
            required: 'Expense Name is required!',
          }}
          label={'Expense Name'}
          placeholder={'Please input expense name'}
          name="name"
          defaultValue={CONSTANTS.STR_EMPTY}
          autoFocus={true}
        />
        <Form.Input
          keyboardType={'numeric'}
          label={'Price'}
          placeholder={'Please input price'}
          name={'price'}
          rules={{
            // valueAsNumber: true,
            required: 'Price is required!',
            min: 0,
            pattern: {
              value: /^[-+]?[1-9]\d*$/,
              message: 'Price must be number',
            },
          }}
        />
        <View.Row>
          <Button.Cancel style={{ marginTop: 10 }} onPress={onCancel} />
          <Form.SubmitButton style={{ marginTop: 10 }} />
        </View.Row>
      </Form.View>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    width: '100%',
  },
  note: {
    height: 200,
    textAlign: 'justify',
    textAlignVertical: 'top',
    // width: '80%',
  },
});
