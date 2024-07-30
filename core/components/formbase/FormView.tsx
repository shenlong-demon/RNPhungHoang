import React, {FC, memo} from 'react';
import {ViewBaseProps} from '@core/components/viewbase/ViewBase';
import View from '@core/components/viewbase/View';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {Logger} from '@core/common';

type Props = ViewBaseProps & {
  onSubmit: (data: any) => void;
  onError?: (error: any, e: any) => void;
};
export const FormView: FC<Props> = memo(
  ({onSubmit, onError, children, ...rest}: Props) => {
    const onSubmitForm: SubmitHandler<any> = (data: any) => {
      Logger.log(() => [`ViewForm onSubmit data`, data]);
      onSubmit(data);
    };

    const onErrorForm: SubmitErrorHandler<any> = (errors, e) => {
      Logger.log(() => [`ViewForm onError errors`, errors]);
      !!onError && onError(errors, e);
    };

    const methods = useForm({mode: 'onChange'});
    const facade: any = {
      ...methods,
      onSubmit: onSubmitForm,
      onError: onErrorForm,
    };
    return (
      <View.V {...rest}>
        <FormProvider {...facade}>{children}</FormProvider>
      </View.V>
    );
  },
);
