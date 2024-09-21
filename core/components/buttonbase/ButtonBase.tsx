import React, { FC, memo, useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { PositionProp, PositionUtil } from '@core/components/common';
import Label from '@core/components/labelbase/Label';

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
  label,
  textStyle,
  isLoading,
  ...rest
}) => {
  const positionStyle = useMemo(() => {
    return PositionUtil.positionStyle(position);
  }, [position]);

  const finalStyles = useMemo(() => {
    return StyleSheet.flatten([styles.common, style, positionStyle]);
  }, [style, positionStyle]);
  return (
    <TouchableOpacity
      style={finalStyles}
      onPress={onPress}
      {...rest}
      disabled={rest.disabled || !!isLoading}>
      {!!label ? (
        <Label.T style={textStyle} text={!!isLoading ? 'Wait' : label} />
      ) : null}
    </TouchableOpacity>
  );
};

export default memo(ButtonBase);

const styles = StyleSheet.create({
  common: {
    height: 48,
    borderWidth: 0.5,
    borderRadius: 5,
    // width: '100%',
    minWidth: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
