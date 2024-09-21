import { ButtonBaseProps } from '@core/components/buttonbase/ButtonBase';
import React, { FC, memo } from 'react';
import Button from '@core/components/buttonbase/Button';
import { useFormContext } from 'react-hook-form';

type Props = ButtonBaseProps & {};

export const FormSubmitButton: FC<Props> = memo((props: Props) => {
  const { handleSubmit, onSubmit, onError, isSubmitting } = useFormContext();

  return (
    <Button.Submit
      {...props}
      isLoading={props.isLoading || isSubmitting}
      onPress={handleSubmit(onSubmit, onError)}
    />
  );
});
