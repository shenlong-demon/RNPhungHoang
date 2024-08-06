import React, {FC, memo} from 'react';
import Form from '@core/components/formbase/Form';
import {CONSTANTS, Logger} from '@core/common';
import {StyleSheet} from 'react-native';
import Button from '@core/components/buttonbase/Button';
import View from '@core/components/viewbase/View';
import {Group, STATUS} from '@src/business';
import {FormStatusDropDown} from '@src/screens/portrait/shared_components/FormStatusDropDown';

type Props = {
  selectedGroup?: Group;
  onOk: (name: string, status: STATUS) => Promise<void>;
  onCancel: () => void;
};
type FormValue = {
  name: string;
  status: STATUS;
};
export const UpdateGroupPopup: FC<Props> = memo(
  ({selectedGroup, onOk, onCancel}: Props) => {
    const onSubmit = async (data: FormValue): Promise<void> => {
      Logger.log(() => [`CreateOperationPopup onSubmit`, data]);
      onOk(data.name, data.status);
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
            required: 'Group Name is required!',
          }}
          label={'Group Name'}
          placeholder={'Please input group name'}
          name="name"
          defaultValue={selectedGroup?.name || CONSTANTS.STR_EMPTY}
          autoFocus={true}
        />
        <FormStatusDropDown
          name={'status'}
          defaultValue={selectedGroup?.status || STATUS.ACTIVE}
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
    paddingRight: 10,
    paddingLeft: 10,
  },
  note: {
    height: 200,
    textAlign: 'justify',
    textAlignVertical: 'top',
    // width: '80%',
  },
});
