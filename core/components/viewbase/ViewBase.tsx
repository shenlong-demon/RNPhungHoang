import {FC, memo, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';

export interface ViewBaseProps extends ViewProps {
  onPress?: () => void;
}
const ViewBase: FC<ViewBaseProps> = ({onPress, style, children}) => {
  const finalStyles = useMemo(() => {
    return StyleSheet.flatten([styles.common, style]);
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
    flex: 1,
    padding: 5,
  },
});
