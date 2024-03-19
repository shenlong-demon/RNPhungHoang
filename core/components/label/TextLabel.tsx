import React, {FC, memo} from 'react';
import {Text, TextProps} from 'react-native';
type Props = {
  text: string;
} & TextProps;
const TextLabel: FC<Props> = ({text}) => {
  return <Text>{text}</Text>;
};
export default memo(TextLabel);
