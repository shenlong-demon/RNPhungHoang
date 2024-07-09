import React, {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import {LabelBase, LabelProps} from '@core/components/labelbase/LabelBase';

const FieldLabel: FC<LabelProps> = ({style, ...rest}) => {
  const finalStyle = StyleSheet.flatten([commonStyle.common, style]);

  return <LabelBase style={finalStyle} {...rest} />;
};

export default memo(FieldLabel);

const commonStyle = StyleSheet.create({
  common: {
    height: 20,
    // fontSize: 14
  },
});
