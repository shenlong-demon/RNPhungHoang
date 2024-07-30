import React, {FC, memo} from 'react';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import {File} from '@core/models';
import Form from '@core/components/formbase/Form';
import {CONSTANTS, Logger} from '@core/common';
import {StyleSheet} from 'react-native';

type Props = {
  onCancel: () => void;
  onOk: (note: string, image?: File) => void;
};
type FormValue = {
  note: string;
  image?: File;
};
export const UpdateOperationIssuePopup: FC<Props> = memo(
  ({onOk, onCancel}: Props) => {
    const onSubmit = async (data: FormValue): Promise<void> => {
      Logger.log(() => [`CreateOperationPopup onSubmit`, data]);
      onOk(data.note, data.image);
    };
    const onError = (errors: any, e: any) => {
      Logger.log(() => [`CreateOperationPopup onError errors`, errors, e]);
      // submitProduct(product)
    };
    return (
      <Form.View style={styles.container} onSubmit={onSubmit} onError={onError}>
        <Form.Image
          style={styles.image}
          canSetSource={true}
          source={null}
          name="image"
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
    alignItems: 'center',
    // flex: 1,
    width: '100%',
  },
  image: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 200,
    height: 200,
  },
  note: {
    height: 200,
    textAlign: 'justify',
    textAlignVertical: 'top',
    // width: '80%',
  },
});
