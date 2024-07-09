import React, {FC, memo} from 'react';
import {UseControllerProps} from 'react-hook-form/dist/types/controller';
import {useController} from 'react-hook-form';
import {ImageBaseProps} from '@core/components/imagebase/ImageBase';
import Image from '@core/components/imagebase/Image';

type Props = ImageBaseProps & UseControllerProps & {};
export const FormImage: FC<Props> = memo(
  ({name, rules, defaultValue, ...rest}: Props) => {
    const {
      field: {onChange, value},
      // fieldState: {error},
    } = useController({
      name,
      rules,
      defaultValue,
    });
    return <Image.I source={value} {...rest} onSourceChanged={onChange} />;
  },
);
