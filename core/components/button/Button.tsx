import React from 'react';
import ButtonPrimary from './ButtonPrimary';
import ButtonNormal from "@core/components/button/ButtonNormal";
import ButtonFloatCircle from "@core/components/button/ButtonFloatCircle";
import ButtonSubmit from "@core/components/form/ButtonSubmitForm";

const Button = () => <React.Fragment />;

Button.Submit = ButtonSubmit;
Button.B = ButtonNormal;
Button.FloatCirle = ButtonFloatCircle;

export default Button;
