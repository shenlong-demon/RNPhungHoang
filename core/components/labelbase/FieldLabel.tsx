import React, {FC, memo, useMemo} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {LabelBase, LabelProps} from '@core/components/labelbase/LabelBase';

const FieldLabel: FC<LabelProps> = ({style, ...rest}) => {
  const finalStyle = useMemo((): StyleProp<ViewStyle> => {
    return StyleSheet.flatten([commonStyle.common, style]);
  }, []);

  return <LabelBase style={finalStyle} {...rest} />;
};

export default memo(FieldLabel);

const commonStyle = StyleSheet.create({
  common: {
    height: 20,
    // fontSize: 14
  },
});
