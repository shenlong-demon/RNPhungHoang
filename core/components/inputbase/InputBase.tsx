import React, {FC, memo, useMemo} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

export type InputBaseProps = {} & TextInputProps;
export const InputBase: FC<InputBaseProps> = memo(
  ({style, multiline, ...rest}) => {
    const finalStyles = useMemo(
      () =>
        StyleSheet.flatten([
          styles.common,
          multiline ? styles.multiLine : {},
          style,
        ]),
      [style, multiline],
    );

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
    // minWidth: 200,
    paddingBottom: -10,
    width: '100%',
  },
  multiLine: {
    borderWidth: 1,
  },
});
