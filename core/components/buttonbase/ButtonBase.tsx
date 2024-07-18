import React, {FC, memo, useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
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
  }, [position]);
  const finalStyles = useMemo(() => {
    return StyleSheet.flatten([styles.common, style, positionStyle]);
  }, [style, positionStyle]);
  return <TouchableOpacity style={finalStyles} onPress={onPress} {...rest} />;
};

export default memo(ButtonBase);

const styles = StyleSheet.create({
  common: {
    width: 60,
    height: 60,
    borderWidth: 0.5,
    borderRadius: 5,
    // width: '100%',

    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
