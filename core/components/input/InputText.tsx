import React, {FC, memo, useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';

export type InputTextProps = {
} & TextInputProps;
const InputText: FC<InputTextProps> = ({style, ...rest}) => {

  const finalStyles = useMemo(
    () => StyleSheet.flatten([commonStyle.input, style]),
    [style],
  );

  return <TextInput {...rest} style={finalStyles} />;
};
export default memo(InputText);

const commonStyle = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    // flex: 1,
    height: 40,
    // paddingLeft: 10,
    // paddingRight: 10,
    fontWeight:'bold',
    fontSize: 18
  }
});
