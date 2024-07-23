import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import Form from '@core/components/formbase/Form';
import {Logger} from '@core/common';

type Props = {
  defaultPrice?: number;
  message: string;
  label: string;
  onOk: (newPrice: number) => void;
  onCancel: () => void;
};
type FormValue = {
  price: number;
};
export const SetPricePopup: FC<Props> = memo(
  ({label, defaultPrice, onOk, onCancel}: Props) => {
    const onSubmit = async (data: FormValue): Promise<void> => {
      Logger.log(() => [`CreateOperationPopup onSubmit`, data]);
      onOk(Number(data.price));
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
            required: `${label} is required!`,
          }}
          label={label}
          placeholder={'Please input note'}
          name="price"
          defaultValue={`${defaultPrice || ''}`}
          autoFocus={true}
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
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
});
