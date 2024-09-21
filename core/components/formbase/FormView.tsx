import React, { FC, memo, useState } from 'react';
import { ViewBaseProps } from '@core/components/viewbase/ViewBase';
import View from '@core/components/viewbase/View';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Logger } from '@core/common';
import { DeviceUtility } from '@core/system/device';

type Props = ViewBaseProps & {
  onSubmit: (data: any) => Promise<void>;
  onError?: (error: any, e: any) => void;
};
export const FormView: FC<Props> = memo(
  ({ onSubmit, onError, children, ...rest }: Props) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const onSubmitForm: SubmitHandler<any> = async (data: any) => {
      Logger.log(() => [`ViewForm onSubmit data`, data]);
      setSubmitting(true);
      DeviceUtility.hideKeyboard();
      await onSubmit(data);
      setSubmitting(false);
    };

    const onErrorForm: SubmitErrorHandler<any> = (errors, e) => {
      Logger.log(() => [`ViewForm onError errors`, errors]);
      !!onError && onError(errors, e);
    };

    const methods = useForm({ mode: 'onChange' });
    const facade: any = {
      ...methods,
      onSubmit: onSubmitForm,
      onError: onErrorForm,
      isSubmitting,
    };
    return (
      <View.V {...rest}>
        <FormProvider {...facade}>{children}</FormProvider>
      </View.V>
    );
  },
);
