import {FC, memo, useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {PositionProp, PositionUtil} from '@core/components/common';

export type ViewBaseProps = ViewProps &
  PositionProp & {
    onPress?: () => void;
  };
const ViewBase: FC<ViewBaseProps> = ({onPress, style, position, children}) => {
  const positionStyle = useMemo((): StyleProp<ViewStyle> => {
    return PositionUtil.positionStyle(position);
  }, [position]);

  const finalStyles = useMemo(() => {
    return StyleSheet.flatten([styles.common, style, positionStyle]);
  }, [style]);

  return !!onPress ? (
    <TouchableOpacity style={finalStyles} onPress={onPress}>
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
    padding: 10,
  },
});
