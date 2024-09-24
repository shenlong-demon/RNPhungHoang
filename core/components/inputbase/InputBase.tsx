import React, { FC, memo, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { DeviceUtility } from '@core/system/device';

export type InputBaseProps = {} & TextInputProps;
export const InputBase: FC<InputBaseProps> = memo(
  ({ style, multiline, autoFocus, ...rest }) => {
    const inputRef = useRef(null);

    const finalStyles = StyleSheet.flatten([
      styles.common,
      multiline ? styles.multiLine : {},
      style,
    ]);

    useEffect(() => {
      if (autoFocus) {
        if (!DeviceUtility.isKeyboardShow) {
          setTimeout(() => {
            // @ts-ignore
            return inputRef.current?.focus();
          }, 200);
        }
      }
    }, []);

    return (
      <TextInput
        ref={inputRef}
        {...rest}
        multiline={multiline}
        style={finalStyles}
      />
    );
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
    color: 'black',
  },
  multiLine: {
    borderWidth: 1,
    marginTop: 10,
  },
});
