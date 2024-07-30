import ButtonBase, {
  ButtonBaseProps,
} from '@core/components/buttonbase/ButtonBase';
import {FC, memo, useMemo} from 'react';
import {StyleSheet} from 'react-native';

const SubmitButton: FC<ButtonBaseProps> = ({
  style,
  label,
  textStyle,
  ...rest
}) => {
  const finalStyles = useMemo(() => {
    return StyleSheet.flatten([styles.common, style]);
  }, [style]);
  const textStyles = StyleSheet.flatten([styles.textStyle, textStyle]);
  const text: string = label || 'OK';
  return (
    <ButtonBase
      {...rest}
      style={finalStyles}
      textStyle={textStyles}
      label={text}
    />
  );
};

const styles = StyleSheet.create({
  common: {
    backgroundColor: 'green',
  },
  textStyle: {
    color: 'white',
  },
});
export default memo(SubmitButton);
