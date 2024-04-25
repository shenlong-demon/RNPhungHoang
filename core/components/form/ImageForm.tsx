import React, {FC, memo} from 'react';
import {InputTextProps} from '../input/InputText';
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Image} from '@core/components';
import {ImageProps} from '@core/components/image/NormalImage';

type ImageFormProps = ImageProps &
  InputTextProps & {
    defaultValue?: any | null;
  } & UseControllerProps;
const ImageTextForm: FC<ImageFormProps> = (props: ImageFormProps) => {
  const {name, rules, label, defaultValue, ...rest} = props;
  const {formState} = useFormContext();
  const {field} = useController({...props, defaultValue: props.defaultValue});

  return <Image.I {...rest} imageSource={field.value} />;
};
export default memo(ImageTextForm);

const styles = StyleSheet.create({
  normal: {},
  error: {
    borderWidth: 1,
    borderColor: 'red',
    borderBottomColor: 'red',
  },
});
