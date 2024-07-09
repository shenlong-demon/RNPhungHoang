import React, {FC} from 'react';
import {Customer} from '@src/business';
import {useNavigation} from '@core/navigation';
import {CONSTANTS, Logger} from '@core/common';
import {File} from '@core/models';
import Form from '@core/components/formbase/Form';
import {StyleSheet} from 'react-native';

type Props = {};
type FormValues = {
  imageFile?: File;
  name: string;
  nickName?: string;
};
export const UpdateCustomerScreen: FC<Props> = ({}) => {
  const {getParam} = useNavigation();
  const customer: Customer | null = getParam();
  const onSubmit = async (data: FormValues) => {
    Logger.log(() => [`UpdateProductScreen onSubmit data`, data]);

    Logger.log(() => [`UpdateProductScreen onSubmit data`]);
  };
  const onError = (errors: any, e: any) => {
    Logger.log(() => [`UpdateProductScreen onError errors`, errors, e]);
    // submitProduct(product)
  };

  return (
    <Form.View onSubmit={onSubmit} onError={onError} style={styles.container}>
      <Form.Image
        name="imageFile"
        source={{uri: customer?.image || CONSTANTS.STR_EMPTY} as File}
        // defaultValue={{uri: customer?.image || CONSTANTS.STR_EMPTY} as File}
        style={styles.avatar}
        canSetSource={true}
      />
      <Form.Input
        label={'Name'}
        name="name"
        placeholder={`Please input customer's name`}
        defaultValue={customer?.name || CONSTANTS.STR_EMPTY}
        rules={{required: 'Name is required.'}}
      />
      <Form.Input
        label={'Nick name'}
        name="nickName"
        defaultValue={customer?.name || CONSTANTS.STR_EMPTY}
      />

      <Form.SubmitButton />
    </Form.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    marginBottom: 30,
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
});
