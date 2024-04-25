import React, {FC} from 'react';
import {Button, Form, View} from '@core/components';
import {
  Brand,
  Group,
  Product,
  STATUS,
  useDataContext,
  useProductFacade,
} from '@src/business';
import {useNavigation} from '@core/navigation';
import {Logger} from '@core/common';
import GroupSelectItem from '@src/screens/portrait/shared_components/GroupSelectItem';
import BrandSelectItem from '@src/screens/portrait/shared_components/BrandSelectItem';
import StatusDropdownForm from '@src/screens/portrait/shared_components/StatusDropdownForm';

type Props = {};
type FormValues = Product & {};
const IMG = `https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/439456158_433098369372067_2798707460766262351_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=-MlkPnwE_coQ7kNvgEq90Ms&_nc_ht=scontent.fhan5-11.fna&oh=00_AfABtdtBzouIxP0YlGc1pHWE_fc_Hxq551smPc5C8msA3g&oe=66306723`;
export const UpdateProductScreen: FC<Props> = ({}) => {
  const {getParam} = useNavigation();
  const {submitProduct} = useProductFacade();
  const product: Product | null = getParam();
  const {groups, brands} = useDataContext();

  const onSubmit = (data: FormValues) => {
    Logger.log(() => [`UpdateProductScreen onSubmit data`, data]);
    // submitProduct(product)
  };
  const onError = (errors: any, e: any) => {
    Logger.log(() => [`UpdateProductScreen onError errors`, errors, e]);
    // submitProduct(product)
  };

  return (
    <Form.View onSubmit={onSubmit} onError={onError}>
      <Form.Image
        style={{
          width: 100,
          backgroundColor: 'red',
          aspectRatio: 1,
          maxHeight: 100,
        }}
        name={'image'}
        canSetSource={true}
        defaultValue={product?.image || IMG}
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
