import React, {FC, memo, useState} from 'react';
import {Button, Input, View} from '@core/components';
import {useAuthFacade} from "@src/business";

type Props = {};
export const LoginScreen: FC<Props> = memo(({}) => {
  const [phone, setPhone] = useState<string>('0905690200');
  const [password, setPassword] = useState<string>('123456');
  const {login} = useAuthFacade();

  const submit = () => {
    login(phone,password);
  };
  return <View.V position={'right'} alignChildren={'center|vertical'} styles={{backgroundColor: 'red'}}>
    <Input.Text onChangeText={setPhone} />
    <Input.Password onChangeText={setPassword}/>
    <Button.B label={'Login'} onPress={submit} />
  </View.V>;
});
