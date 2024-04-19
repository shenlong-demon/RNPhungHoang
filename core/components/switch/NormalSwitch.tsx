import React, { FC, memo, useMemo } from 'react';
import { StyleSheet, Switch as RNSwitch, SwitchProps as RNSwitchProps, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

export type SwitchProps = {} & RNSwitchProps;
const NormalSwitch: FC<SwitchProps> = ({ style, ...rest }) => {
  const finalStyle = useMemo((): StyleProp<ViewStyle> => {
    return StyleSheet.flatten([{ ...commonStyle.common }, style]);
  }, [style]);
  return (
    <RNSwitch trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={'green'} style={finalStyle} {...rest} />
  );
};

NormalSwitch.displayName = 'Switch.NormalSwitch';

export default memo(NormalSwitch);

const commonStyle = StyleSheet.create({
  common: {
    width: 50,
    height: 40,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});
