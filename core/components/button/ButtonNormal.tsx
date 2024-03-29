import React, {FC, memo, useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Label} from '@core/components';
import {CONSTANTS} from '@core/common';
export type ButtonProps = {
  label?: string;
} & TouchableOpacityProps;
const ButtonNormal: FC<ButtonProps> = ({label, ...rest}) => {
  const buttonStyle = useMemo(() => StyleSheet.flatten([styles.button]), []);

  return (
    <TouchableOpacity style={buttonStyle} {...rest}>
      {!!label ? <Label.T text={label} /> : null}
    </TouchableOpacity>
  );
};

export default memo(ButtonNormal);

const styles = StyleSheet.create({
  container: {},
  button: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
