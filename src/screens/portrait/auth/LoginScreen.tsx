import React, {FC, memo, useState} from 'react';
import {useAuthFacade} from '@src/business';
import Form from '@core/components/formbase/Form';
import View from '@core/components/viewbase/View';
import {StyleSheet} from 'react-native';

type Props = {};
type FormData = {
  phone: string;
  password: string;
};
export const LoginScreen: FC<Props> = memo(({}) => {
  const {login} = useAuthFacade();

  const handleSubmit = (data: FormData): void => {
    login(data.phone, data.password);
  };
  return (
    <View.Center style={styles.container}>
      <Form.View onSubmit={handleSubmit}>
        <Form.Input name={'phone'} label="Phone" />
        <Form.Input name={'password'} label="Password" />
        <Form.SubmitButton style={styles.submit} label={'Login'} />
      </Form.View>
    </View.Center>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submit: {
    alignSelf: 'center',
  },
});
