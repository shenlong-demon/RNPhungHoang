import React, {FC, memo} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

export type LabelProps = {
  text: string;
} & TextProps;
export const LabelBase: FC<LabelProps> = memo(({style, text, ...rest}) => {
  const finalStyle = StyleSheet.flatten([{...commonStyle.label}, style]);
  return (
    <Text style={finalStyle} {...rest}>
      {text}
    </Text>
  );
});

const commonStyle = StyleSheet.create({
  label: {
    // height: 40,
    color: 'black',
    textAlignVertical: 'center',
    fontSize: 16,
  },
});
