import React, {FC} from 'react';
import {Customer, STATUS} from '@src/business';
import {useNavigation} from '@core/navigation';
import {CONSTANTS, Dto, Logger, Utility} from '@core/common';
import {File} from '@core/models';
import Form from '@core/components/formbase/Form';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import {useCustomerFacade} from '@src/business/useFacade/useCustomerFacade';
import {FormStatusDropDown} from '@src/screens/portrait/shared_components/FormStatusDropDown';
export type CustomerUpdateNavigationParam = {
  assignCustomerFunc?: (
    selectedCustomer: Customer,
    fromSelected: boolean,
  ) => void;
  customer: Customer | null;
};
type Props = {};
type FormValues = {
  imageFile?: File;
  name: string;
  phone: string;
  nickName?: string;
};
export const UpdateCustomerScreen: FC<Props> = ({}) => {
  const {getParam, goBack} = useNavigation();
  const param: CustomerUpdateNavigationParam | null = getParam();
  const customer: Customer | null = param?.customer || null;
  const {createCustomer, updateCustomer} = useCustomerFacade();
  const onSubmit = async (data: FormValues) => {
    const id: number = customer?.id || 0;
    const appKey: string = customer?.appKey || Utility.UUID();
    const status: number = 1;
    Logger.log(() => [`UpdateProductScreen onSubmit data`, data]);

    if (id === 0) {
      const dto: Dto<Customer | null> = await createCustomer(
        {
          name: data.name,
          phone: data.phone,
          nickName: data.nickName,
          status: status,
        },
        data.imageFile,
      );
      Logger.log(() => [`UpdateProductScreen onSubmit createCustomer`, dto]);
      if (dto.next()) {
        if (!!param?.assignCustomerFunc) {
          param.assignCustomerFunc(dto.data as Customer, false);
        }
      }
    } else {
      const dto: Dto<Customer | null> = await updateCustomer(
        id,
        appKey,
        {
          name: data.name,
          phone: data.phone,
          nickName: data.nickName,
          status: status,
        },
        data.imageFile,
      );
      Logger.log(() => [`UpdateProductScreen onSubmit updateCustomer`, dto]);
    }
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
        label={'Phone number'}
        name="phone"
        placeholder={`Please input phone number`}
        defaultValue={customer?.phone || CONSTANTS.STR_EMPTY}
        rules={{required: 'Phone number is required.'}}
      />
      <Form.Input
        label={'Nick name'}
        name="nickName"
        placeholder={`Please input nick name`}
        defaultValue={customer?.nickName || CONSTANTS.STR_EMPTY}
      />
      <FormStatusDropDown
        name={'status'}
        defaultValue={customer?.status || STATUS.ACTIVE}
      />
      <View.Row style={styles.buttonAction}>
        <Button.Cancel onPress={goBack} />
        <Form.SubmitButton />
      </View.Row>
    </Form.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonAction: {
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  avatar: {
    alignSelf: 'center',
  },
});
