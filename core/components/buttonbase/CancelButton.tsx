import ButtonBase, {
  ButtonBaseProps,
} from '@core/components/buttonbase/ButtonBase';
import {FC, memo, useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const CancelButton: FC<ButtonBaseProps> = memo(
  ({style, label, textStyle, ...rest}) => {
    const finalStyles = useMemo(() => {
      return StyleSheet.flatten([styles.common, style]);
    }, [style]);
    const textStyles = StyleSheet.flatten([styles.commonText, textStyle]);
    const text: string = label || 'Cancel';
    return (
      <ButtonBase
        label={text}
        {...rest}
        textStyle={textStyles}
        style={finalStyles}
      />
    );
  },
);

const styles = StyleSheet.create({
  common: {
    backgroundColor: 'orange',
  },
  commonText: {
    color: 'white',
  },
});
