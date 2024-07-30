import {FC, memo} from 'react';
import Form from '@core/components/formbase/Form';
import {CONSTANTS, Dto, Logger} from '@core/common';
import {StyleSheet} from 'react-native';
import {Operation, useOperationFacade} from '@src/business';
import Button from '@core/components/buttonbase/Button';
import View from '@core/components/viewbase/View';

type Props = {
  onOk: (op: Operation) => Promise<void>;
  onCancel: () => void;
};
type FormValue = {
  name?: string;
};
export const CreateOperationPopup: FC<Props> = memo(
  ({onOk, onCancel}: Props) => {
    const {createOperation} = useOperationFacade();
    const onSubmit = async (data: FormValue): Promise<void> => {
      Logger.log(() => [`CreateOperationPopup onSubmit`, data]);
      const dto: Dto<Operation | null> = await createOperation(data.name);
      onOk(dto.data as Operation);
    };
    const onError = (errors: any, e: any) => {
      Logger.log(() => [`CreateOperationPopup onError errors`, errors, e]);
      // submitProduct(product)
    };

    return (
      <Form.View style={styles.container} onSubmit={onSubmit} onError={onError}>
        <Form.Input
          label={'Name'}
          name="name"
          defaultValue={CONSTANTS.STR_EMPTY}
          autoFocus={true}
        />
        <View.Row>
          <Button.Cancel onPress={onCancel} />
          <Form.SubmitButton />
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
    // width: '800%',
  },
});
