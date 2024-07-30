import React, {FC, memo} from 'react';
import Form from '@core/components/formbase/Form';
import {CONSTANTS, Logger} from '@core/common';
import {StyleSheet} from 'react-native';
import Button from '@core/components/buttonbase/Button';
import View from '@core/components/viewbase/View';

type Props = {
  defaultServiceName?: string;
  onOk: (name: string, price: number, note: string) => Promise<void>;
  onCancel: () => void;
};
type FormValue = {
  name: string;
  price: string;
  note: string;
};
export const AddServicePopup: FC<Props> = memo(
  ({defaultServiceName, onOk, onCancel}: Props) => {
    const onSubmit = async (data: FormValue): Promise<void> => {
      Logger.log(() => [`CreateOperationPopup onSubmit`, data]);
      onOk(data.name, Number(data.price), data.note);
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
            required: 'Service Name is required!',
          }}
          label={'Service Name'}
          placeholder={'Please input service name'}
          name="name"
          defaultValue={defaultServiceName || CONSTANTS.STR_EMPTY}
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
        <Form.Input
          multiline={true}
          numberOfLines={5}
          rules={{required: 'Note is required!'}}
          defaultValue={CONSTANTS.STR_EMPTY}
          label={'Note'}
          name="note"
          style={styles.note}
        />
        <View.Row>
          <Button.Cancel style={{marginTop: 10}} onPress={onCancel} />
          <Form.SubmitButton style={{marginTop: 10}} />
        </View.Row>
      </Form.View>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    // flex: 1,
  },
  note: {
    height: 300,
    textAlign: 'justify',
    textAlignVertical: 'top',
    width: '80%',
  },
});
