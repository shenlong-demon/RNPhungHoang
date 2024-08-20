import React, { FC } from 'react';
import { Brand, Group, Product, STATUS, useDataContext } from '@src/business';
import { useNavigation } from '@core/navigation';
import { CONSTANTS, Dto, Logger } from '@core/common';
import { File } from '@core/models';
import {
  CreateProductRequest,
  UpdateProductRequest,
} from '@src/business/model';
import Form from '@core/components/formbase/Form';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { FormStatusDropDown } from '@src/screens/portrait/shared_components/FormStatusDropDown';
import { ScrollView } from 'react-native-gesture-handler';
import GroupSelectItem from '@src/screens/portrait/shared_components/GroupSelectItem';
import BrandSelectItem from '@src/screens/portrait/shared_components/BrandSelectItem';
import View from '@core/components/viewbase/View';

type Props = {};
type FormValues = Product & {
  imageFile?: File;
};
export const UpdateProductScreen: FC<Props> = ({}) => {
  const { goBack, getParam } = useNavigation();

  const product: Product | null = getParam();
  const { activeGroups, activeBrands, createProduct, updateProduct } =
    useDataContext();

  const onSubmit = async (data: FormValues) => {
    let dto: Dto<Product | null>;
    data.price = Number(data.price);
    data.basePrice = Number(data.basePrice);
    data.quantity = Number(data.quantity);
    if (product) {
      dto = await updateProduct(
        product.id,
        product.appKey,
        {
          name: data.name,
          code: data.code,
          otherName: data.otherName,
          basePrice: data.basePrice,
          price: data.price,
          brandId: data.brand.id,
          groupId: data.group.id,
          image: product.image,
          status: data.status,
          quantity: data.quantity,
        } as UpdateProductRequest,
        data.imageFile,
      );
    } else {
      dto = await createProduct(
        {
          name: data.name,
          code: data.code,
          otherName: data.otherName,
          basePrice: data.basePrice,
          price: data.price,
          quantity: data.quantity,
          brandId: data.brand.id,
          groupId: data.group.id,
          status: data.status,
        } as CreateProductRequest,
        data.imageFile,
      );
    }
    Logger.log(() => [`UpdateProductScreen onSubmit data`, dto]);
    if (dto.next()) {
      goBack();
    }
  };
  const onError = (errors: any, e: any) => {
    Logger.log(() => [`UpdateProductScreen onError errors`, errors, e]);
    // submitProduct(product)
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Form.View
          style={styles.container}
          onSubmit={onSubmit}
          onError={onError}>
          <Form.Image
            name="imageFile"
            source={{ uri: product?.image || CONSTANTS.STR_EMPTY } as File}
            defaultValue={{ uri: product?.image } as File}
            style={styles.avatar}
            canSetSource={true}
          />

          <Form.Input
            label={'Product Name'}
            placeholder={'Please input product name'}
            defaultValue={product?.name}
            name={'name'}
            rules={{ required: 'Name is required!' }}
          />
          <Form.Input
            label={'Other Name'}
            placeholder={'Please input other name'}
            defaultValue={product?.otherName}
            name={'otherName'}
          />
          <Form.Input
            label={'Code'}
            placeholder={'Please input code'}
            defaultValue={product?.code}
            name={'code'}
          />
          <Form.DropDown
            label={'Group'}
            placeholder={'Select group'}
            name={'group'}
            data={activeGroups}
            rules={{ required: 'Group is required!' }}
            labelField={'name'}
            valueField={'id'}
            renderItem={(group: Group) => <GroupSelectItem group={group} />}
            defaultValue={product?.group}
            isSearch={true}
          />

          <Form.DropDown
            label={'Brand'}
            placeholder={'Select brand'}
            name={'brand'}
            data={activeBrands}
            rules={{ required: 'Brand is required!' }}
            labelField={'name'}
            valueField={'id'}
            renderItem={(brand: Brand) => <BrandSelectItem brand={brand} />}
            defaultValue={product?.brand}
            isSearch={true}
          />

          <Form.Input
            keyboardType={'numeric'}
            label={'Base Price'}
            placeholder={'Please input base price'}
            defaultValue={`${product?.basePrice || CONSTANTS.STR_EMPTY}`}
            name={'basePrice'}
            rules={{
              // valueAsNumber: true,
              required: 'Base Price is required!',
              min: 0,
              pattern: {
                value: /^[-+]?[1-9]\d*$/,
                message: 'Price must be number',
              },
            }}
          />
          <Form.Input
            keyboardType={'numeric'}
            label={'Price'}
            placeholder={'Please input price'}
            defaultValue={`${product?.price || CONSTANTS.STR_EMPTY}`}
            name={'price'}
            rules={{
              // valueAsNumber: true,
              required: 'Price is required!',
              min: 0,
              pattern: {
                value: /^[-+]?[1-9]\d*$/,
                message: 'Price must be number',
              },
            }}
          />
          <Form.Input
            keyboardType={'numeric'}
            label={'Quantity'}
            placeholder={'Please input quantity'}
            defaultValue={`${product?.quantity || CONSTANTS.STR_EMPTY}`}
            name={'quantity'}
            rules={{
              required: 'Quantity is required!',
              // valueAsNumber: true,
              min: 0,
              pattern: {
                value: /^[-+]?[1-9]\d*$/,
                message: 'Quantity must be number',
              },
            }}
          />
          <FormStatusDropDown
            name={'status'}
            defaultValue={product?.status || STATUS.ACTIVE}
          />
          <Form.SubmitButton />
          <View.V style={{ width: '100%', height: 100 }} />
        </Form.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  avatar: {
    alignSelf: 'center',
  },
});
