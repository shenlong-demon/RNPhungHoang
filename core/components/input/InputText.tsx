import React, {FC, memo, useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';

export type InputTextProps = {
  styles?: StyleProp<ViewStyle>;
} & TextInputProps;
const InputText: FC<InputTextProps> = ({styles, ...rest}) => {

  const finalStyles = useMemo(
    () => StyleSheet.flatten([commonStyle.input, styles]),
    [],
  );

  return <TextInput {...rest} style={finalStyles} />;
};
export default memo(InputText);

const commonStyle = StyleSheet.create({
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    flex: 1,
    height: 40
  }
});
