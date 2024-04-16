import React, { FC, memo, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Label } from '@core/components';

export type ButtonProps = {
  label?: string;
} & TouchableOpacityProps;
const ButtonNormal: FC<ButtonProps> = ({ style, label, ...rest }) => {
  const finalStyle = useMemo(() => StyleSheet.flatten([styles.button, style]), []);

  return (
    <TouchableOpacity style={finalStyle} {...rest}>
      {!!label ? <Label.T text={label} /> : null}
    </TouchableOpacity>
  );
};

export default memo(ButtonNormal);

const styles = StyleSheet.create({
  container: {},
  button: {
    height: 48,
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
