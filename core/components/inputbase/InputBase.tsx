import React, {FC, memo} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

export type InputBaseProps = {} & TextInputProps;
export const InputBase: FC<InputBaseProps> = memo(
  ({style, multiline, ...rest}) => {
    const finalStyles = StyleSheet.flatten([
      styles.common,
      multiline ? styles.multiLine : {},
      style,
    ]);

    return <TextInput {...rest} multiline={multiline} style={finalStyles} />;
  },
);

const styles = StyleSheet.create({
  common: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    height: 40,
    fontWeight: 'bold',
    fontSize: 18,
    // textAlignVertical: 'bottom',
    // verticalAlign: 'bottom',
    minWidth: '70%',
    paddingBottom: -10,
    width: '100%',
  },
  multiLine: {
    borderWidth: 1,
    marginTop: 10,
  },
});
