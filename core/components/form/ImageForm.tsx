import React, {FC, memo} from 'react';
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Image} from '@core/components';
import {File} from '@core/models';

type ImageFormProps = {value?: File} & UseControllerProps;
const ImageForm: FC<ImageFormProps> = (props: ImageFormProps) => {
  const {defaultValue, style} = props;
  const {formState} = useFormContext();
  const {field} = useController({...props, defaultValue: defaultValue});

  return (
    <Image.I {...props} source={field.value} onSourceChanged={field.onChange} />
  );
};
export default memo(ImageForm);

const styles = StyleSheet.create({
  common: {},
});
