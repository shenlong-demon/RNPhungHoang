import React, {FC} from 'react';
import {Button, Form, Label, View} from '@core/components';
import {
  Brand,
  Group,
  Product,
  STATUS,
  useDataContext,
  useProductFacade,
} from '@src/business';
import {useNavigation} from '@core/navigation';
import {CONSTANTS, Logger} from '@core/common';
import GroupSelectItem from '@src/screens/portrait/shared_components/GroupSelectItem';
import BrandSelectItem from '@src/screens/portrait/shared_components/BrandSelectItem';
import StatusDropdownForm from '@src/screens/portrait/shared_components/StatusDropdownForm';
import {File} from '@core/models';

type Props = {};
type FormValues = Product & {
  imageFile?: File;
};
export const UpdateProductScreen: FC<Props> = ({}) => {
  const {getParam} = useNavigation();
  const {submitProduct} = useProductFacade();
  const product: Product | null = getParam();
  const {groups, brands} = useDataContext();

  const onSubmit = (data: FormValues) => {
    Logger.log(() => [`UpdateProductScreen onSubmit data`, data]);
    submitProduct(product?.id || CONSTANTS.STR_EMPTY, data, data.imageFile);
  };
  const onError = (errors: any, e: any) => {
    Logger.log(() => [`UpdateProductScreen onError errors`, errors, e]);
    // submitProduct(product)
  };

  return (
    <Form.View onSubmit={onSubmit} onError={onError}>
      <Label.T text={'Imager'} />
      <Form.Image
        style={{
          width: 100,
          backgroundColor: 'red',
          aspectRatio: 1,
          height: 100,
        }}
        name={'imageFile'}
        canSetSource={true}
        defaultValue={{uri: product?.image} as File}
      />

      <Form.InputText
        label={'Product name'}
        placeholder={'Please input product name'}
        defaultValue={product?.name}
        name={'name'}
        rules={{required: 'Name is required!'}}
      />
      <Form.InputText
        label={'Other name'}
        placeholder={'Please input other name'}
        defaultValue={product?.otherName}
        name={'otherName'}
      />
      <Form.InputText
        label={'Code'}
        placeholder={'Please input code'}
        defaultValue={product?.code}
        name={'code'}
      />
      <View.Row>
        <Form.SingleDropdown
          placeholder={'Select group'}
          name={'group'}
          data={groups}
          rules={{required: 'Group is required!'}}
          labelField={'name'}
          valueField={'id'}
          renderItem={(group: Group) => <GroupSelectItem group={group} />}
          defaultValue={product?.group}
        />
        <Form.SingleDropdown
          placeholder={'Select brand'}
          name={'brand'}
          data={brands}
          rules={{required: 'Brand is required!'}}
          labelField={'name'}
          valueField={'id'}
          renderItem={(brand: Brand) => <BrandSelectItem brand={brand} />}
          defaultValue={product?.brand}
        />
      </View.Row>

      <Form.InputText
        keyboardType={'numeric'}
        label={'Price'}
        placeholder={'Please input price'}
        defaultValue={`${product?.price}`}
        name={'price'}
        rules={{
          valueAsNumber: true,
          required: 'Price is required!',
          min: 0,
          pattern: {
            value: /^[-+]?[1-9]\d*$/,
            message: 'Price must be number',
          },
        }}
      />
      <Form.InputText
        keyboardType={'numeric'}
        label={'Quantity'}
        placeholder={'Please input quantity'}
        defaultValue={`${product?.quantity}`}
        name={'quantity'}
        rules={{
          required: 'Quantity is required!',
          valueAsNumber: true,
          min: 0,
          pattern: {
            value: /^[-+]?[1-9]\d*$/,
            message: 'Quantity must be number',
          },
        }}
      />
      <View.Row>
        <StatusDropdownForm
          name={'status'}
          defaultValue={!!product ? product.status : STATUS.ACTIVE}
        />
      </View.Row>
      <Button.Submit />
    </Form.View>
  );
};
