import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import Form from '@core/components/formbase/Form';
import {CONSTANTS, Logger} from '@core/common';

type Props = {
  defaultNote?: string;
  onOk: (newNote: string) => void;
  onCancel: () => void;
};
type FormValue = {
  note: string;
};
export const SetNotePopup: FC<Props> = memo(
  ({defaultNote, onOk, onCancel}: Props) => {
    const onSubmit = async (data: FormValue): Promise<void> => {
      Logger.log(() => [`CreateOperationPopup onSubmit`, data]);
      onOk(data.note);
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
            required: 'Note is required!',
          }}
          label={'Note'}
          placeholder={'Please input note'}
          name="note"
          defaultValue={defaultNote || CONSTANTS.STR_EMPTY}
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
