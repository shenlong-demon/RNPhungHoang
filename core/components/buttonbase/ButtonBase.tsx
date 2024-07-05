import React, {FC, memo, useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Label} from '@core/components';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {PositionProp, PositionUtil} from '@core/components/common';

export type ButtonBaseProps = TouchableOpacityProps &
  PositionProp & {
    label?: string;
    textStyle?: TextStyle;
    isLoading?: boolean;
  };
const ButtonBase: FC<ButtonBaseProps> = ({
  onPress,
  style,
  position,
  ...rest
}) => {
  const positionStyle = useMemo(() => {
    return PositionUtil.positionStyle(position);
  }, []);
  const finalStyles = useMemo(() => {
    return StyleSheet.flatten([styles.common, style, positionStyle]);
  }, [style]);
  return <TouchableOpacity style={finalStyles} onPress={onPress} {...rest} />;
};

export default memo(ButtonBase);

const styles = StyleSheet.create({
  common: {
    height: 48,
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});