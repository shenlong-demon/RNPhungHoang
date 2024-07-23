import {FC, memo} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import {PositionProp, PositionUtil} from '@core/components/common';

export type ViewBaseProps = ViewProps &
  PositionProp & {
    onPress?: () => void;
    onLongPress?: () => void;
  };
const ViewBase: FC<ViewBaseProps> = ({
  onPress,
  onLongPress,
  style,
  position,
  children,
}) => {
  const positionStyle = PositionUtil.positionStyle(position);

  const finalStyles = StyleSheet.flatten([styles.common, style, positionStyle]);

  return !!onPress || !!onLongPress ? (
    <TouchableOpacity
      style={finalStyles}
      onPress={onPress}
      onLongPress={onLongPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={finalStyles}>{children}</View>
  );
};

export default memo(ViewBase);

const styles = StyleSheet.create({
  common: {
    // flex: 1,
    // padding: 5,
  },
});
