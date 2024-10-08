import React, { FC, memo, useEffect, useState } from 'react';
import { ENV, useAuthFacade } from '@src/business';
import Form from '@core/components/formbase/Form';
import View from '@core/components/viewbase/View';
import { StyleSheet } from 'react-native';
import Label from '@core/components/labelbase/Label';
import { CONSTANTS } from '@core/common';
import { InfoFacade } from '@src/business/facade/InfoFacade';

type Props = {};
type FormData = {
  phone: string;
  password: string;
};
export const LoginScreen: FC<Props> = memo(({}) => {
  const [info, setInfo] = useState<string>(CONSTANTS.STR_EMPTY);
  const { login } = useAuthFacade();
  useEffect(() => {
    loadInfo();
  }, []);

  const loadInfo = async (): Promise<void> => {
    const data = await InfoFacade.shared().getInfo();
    setInfo(data);
  };
  const handleSubmit = async (data: FormData): Promise<void> => {
    await login(data.phone, data.password);
  };
  return (
    <View.Center style={styles.container}>
      <Form.View onSubmit={handleSubmit}>
        <Form.Input name={'phone'} label="Phone" />
        <Form.Input name={'password'} label="Password" />
        <Form.SubmitButton style={styles.submit} label={'Login'} />
      </Form.View>
      <Label.T
        text={`${ENV.ENV}\n${ENV.HOST}\n${info}`}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 10,
          width: '100%',
          textAlign: 'center',
        }}
      />
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
