import React, { FC, memo } from 'react';
import Form from '@core/components/formbase/Form';
import { CONSTANTS, Logger } from '@core/common';
import { StyleSheet } from 'react-native';
import Button from '@core/components/buttonbase/Button';
import View from '@core/components/viewbase/View';

type Props = {
  onOk: (name: string, basePrice: number, price: number) => Promise<void>;
  onCancel: () => void;
};
type FormValue = {
  name: string;
  basePrice: string;
  price: string;
};
export const AddSimpleProductPopup: FC<Props> = memo(
  ({ onOk, onCancel }: Props) => {
    const onSubmit = async (data: FormValue): Promise<void> => {
      Logger.log(() => [`AddSimpleProductPopup onSubmit`, data]);
      onOk(data.name, Number(data.basePrice), Number(data.price));
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
            required: 'Product Name is required!',
          }}
          label={'Product Name'}
          placeholder={'Please input service name'}
          name="name"
          defaultValue={CONSTANTS.STR_EMPTY}
          autoFocus={true}
        />
        <Form.Input
          keyboardType={'numeric'}
          label={'Base Price'}
          placeholder={'Please input base price'}
          name={'basePrice'}
          rules={{
            // valueAsNumber: true,
            required: 'Base Price is required!',
            min: 0,
            pattern: {
              value: /^[-+]?[1-9]\d*$/,
              message: 'Base Price must be number',
            },
          }}
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
