import React, {FC, memo, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, TouchableOpacityProps,} from 'react-native';
import {Label} from '@core/components';

export type ButtonProps = {
  label?: string;
} & TouchableOpacityProps;
const ButtonPrimary: FC<ButtonProps> = ({style, label, ...rest}) => {
  const buttonStyle = useMemo(() => StyleSheet.flatten([commonStyles.button, style]), []);

  return (
    <TouchableOpacity style={buttonStyle} {...rest}>
      {!!label ? <Label.T text={label} /> : null}
    </TouchableOpacity>
  );
};

export default memo(ButtonPrimary);

const commonStyles = StyleSheet.create({
  container: {},
  button: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
