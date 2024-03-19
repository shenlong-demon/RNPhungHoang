import React, {FC, memo, useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';

export type InputTextProps = {
  style?: StyleProp<ViewStyle>;
} & TextInputProps;
const InputText: FC<InputTextProps> = ({style, ...rest}) => {
  const inputStyle = {};

  const styles = useMemo(
    () => StyleSheet.flatten([style, inputStyle]),
    [style, inputStyle],
  );

  return <TextInput {...rest} style={styles} />;
};
export default memo(InputText);
