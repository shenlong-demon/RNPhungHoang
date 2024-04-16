import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import ViewContainer, { ViewContainerProps } from '@core/components/view/ViewContainer';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Logger } from '@core/common';

type Props = ViewContainerProps & {
  onSubmit: (data: any) => void;
  onError: (error: any, e: any) => void;
};
const ViewForm: FC<Props> = (props: Props) => {
  const onSubmit: SubmitHandler<any> = (data: any) => {
    Logger.log(() => [`ViewForm onSubmit data`, data]);
    props.onSubmit(data);
  };

  const onError: SubmitErrorHandler<any> = (errors, e) => {
    Logger.log(() => [`ViewForm onError errors`, errors]);
    props.onError(errors, e);
  };

  const methods = useForm({ mode: 'onChange' });
  const facade: any = { ...methods, onSubmit, onError };

  return (
    <ViewContainer {...props}>
      <FormProvider {...facade}>{props.children}</FormProvider>
    </ViewContainer>
  );
};
ViewForm.displayName = 'View.Dropdown';

export default memo(ViewForm);

const commonStyle = StyleSheet.create({});
