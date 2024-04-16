import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import ButtonNormal, { ButtonProps } from '@core/components/button/ButtonNormal';
import { useFormContext } from 'react-hook-form';

const ButtonSubmitForm: FC<ButtonProps> = (props: ButtonProps) => {
  const formContext = useFormContext();

  return (
    // @ts-ignore
    <ButtonNormal {...props} onPress={formContext.handleSubmit(formContext.onSubmit, formContext.onError)} />
  );
};

export default memo(ButtonSubmitForm);

const commonStyles = StyleSheet.create({
  container: {},
  button: {},
});
