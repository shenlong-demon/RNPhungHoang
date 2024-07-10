import React, {FC, memo} from 'react';
import {
  StyleSheet,
  Switch as RNSwitch,
  SwitchProps as RNSwitchProps,
} from 'react-native';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';

export type SwitchBaseProps = {
  label: string;
} & RNSwitchProps;
export const SwitchBase: FC<SwitchBaseProps> = memo(
  ({label, style, ...rest}) => {
    const finalStyle = StyleSheet.flatten([styles.common, style]);

    return (
      <View.V style={styles.container}>
        <Label.Field text={label} />
        <RNSwitch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={'green'}
          style={finalStyle}
          {...rest}
        />
      </View.V>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  common: {
    width: 50,
    height: 40,
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
});
