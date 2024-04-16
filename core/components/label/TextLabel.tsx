import React, { FC, memo, useMemo } from 'react';
import { StyleSheet, Text, TextProps, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type TextLabelProps = {
  style?: StyleProp<TextStyle> | undefined;
  text: string;
} & TextProps;
const TextLabel: FC<TextLabelProps> = ({ style, text, ...rest }) => {
  const finalStyle = useMemo((): StyleProp<ViewStyle> => {
    return StyleSheet.flatten([commonStyle.label, style]);
  }, [style]);
  return (
    <Text style={finalStyle} {...rest}>
      {text}
    </Text>
  );
};

TextLabel.displayName = 'Label.TextLabel';

export default memo(TextLabel);

const commonStyle = StyleSheet.create({
  label: {
    height: 40,
    color: 'black',
    textAlignVertical: 'center',
    margin: 5,
  },
});
