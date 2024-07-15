import React, {FC, memo, useMemo} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

export type InputBaseProps = {} & TextInputProps;
export const InputBase: FC<InputBaseProps> = memo(({style, ...rest}) => {
  const finalStyles = useMemo(
    () => StyleSheet.flatten([styles.common, style]),
    [style],
  );

  return <TextInput {...rest} style={finalStyles} />;
});

const styles = StyleSheet.create({
  common: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    height: 40,
    fontWeight: 'bold',
    fontSize: 18,
    // textAlignVertical: 'bottom',
    // verticalAlign: 'bottom',
    paddingBottom: -10,
    width: '100%'
  },
});
