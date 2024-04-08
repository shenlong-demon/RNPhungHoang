import React, {FC, memo, useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Label} from '@core/components';
import {CONSTANTS} from '@core/common';
import ButtonNormal from "@core/components/button/ButtonNormal";
import {PositionProp, PositionUtil} from "@core/components/common";
export type ButtonProps = {
  label?: string;
} & TouchableOpacityProps & PositionProp;
const ButtonFloatCircle: FC<ButtonProps> = ({position, label, ...rest}) => {
  const positionStyle = useMemo(() => {
    return PositionUtil.positionStyle(position);
  }, []);
  const finalStyle = useMemo(() => StyleSheet.flatten([styles.button, positionStyle]), []);

  return (
    <ButtonNormal style={finalStyle} {...rest} />
  );
};

export default memo(ButtonFloatCircle);

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
    backgroundColor: 'green'
  },
});
