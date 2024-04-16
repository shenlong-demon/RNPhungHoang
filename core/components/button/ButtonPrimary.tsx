import React, { FC, memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import ButtonNormal, { ButtonProps } from '@core/components/button/ButtonNormal';

const ButtonPrimary: FC<ButtonProps> = ({ style, label, ...rest }) => {
  const buttonStyle = useMemo(() => StyleSheet.flatten([commonStyles.button, style]), []);

  return <ButtonNormal style={buttonStyle} {...rest} />;
};

export default memo(ButtonPrimary);

const commonStyles = StyleSheet.create({
  container: {},
  button: {},
});
