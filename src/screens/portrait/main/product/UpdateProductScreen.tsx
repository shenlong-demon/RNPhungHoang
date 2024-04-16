import React, { FC } from 'react';
import { Button, Form, Input, Label, View } from '@core/components';
import { Brand, Group, Product, useDataContext, useProductFacade } from '@src/business';
import { useNavigation } from '@core/navigation';
import { Logger } from '@core/common';
import DropdownSingleSelectForm from '@core/components/form/DropdownSingleSelectForm';
import GroupSelectItem from '@src/screens/portrait/shared_components/GroupSelectItem';
import BrandSelectItem from '@src/screens/portrait/shared_components/BrandSelectItem';

type Props = {};
type FormValues = Product & {};
export const UpdateProductScreen: FC<Props> = ({}) => {
  const { getParam } = useNavigation();
  const { submitProduct } = useProductFacade();
  const product: Product | null = getParam();
  const { groups, brands } = useDataContext();

  const onSubmit = (data: FormValues) => {
    Logger.log(() => [`UpdateProductScreen onSubmit data`, data]);
    // submitProduct(product)
  };
  const onError = (errors: any, e: any) => {
    Logger.log(() => [`UpdateProductScreen onError errors`, errors, e]);
    // submitProduct(product)
  };

  const onBrandAndGroupChange = (brand: Brand | null, group: Group | null): void => {};

  return (
    <Form.View onSubmit={onSubmit} onError={onError}>
      <Form.InputText
        label={`Product name`}
        placeholder={'Please input product name'}
        defaultValue={product?.name}
        name={'name'}
        rules={{ required: 'Name is required!' }}
      />

      <View.Row>
        <Label.T text={'Code'} />
        <Input.Text />
      </View.Row>
      <View.Row>
        <DropdownSingleSelectForm
          placeholder={'Select group'}
          name={'group'}
          data={groups}
          rules={{ required: 'Group is required!' }}
          labelField={'name'}
          valueField={'id'}
          renderItem={(group: Group) => <GroupSelectItem group={group} />}
          defaultValue={product?.group}
        />
        <DropdownSingleSelectForm
          placeholder={'Select brand'}
          name={'brand'}
          data={brands}
          rules={{ required: 'Brand is required!' }}
          labelField={'name'}
          valueField={'id'}
          renderItem={(brand: Brand) => <BrandSelectItem brand={brand} />}
          defaultValue={product?.brand}
        />
      </View.Row>

      <View.Row>
        <Label.T text={'Price'} />
        <Input.Text />
      </View.Row>
      <View.Row>
        <Label.T text={'Quantity'} />
        <Input.Text />
      </View.Row>

      <Button.Submit />
    </Form.View>
  );
};
