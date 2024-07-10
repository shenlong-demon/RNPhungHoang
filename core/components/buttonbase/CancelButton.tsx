import ButtonBase, {
  ButtonBaseProps,
} from '@core/components/buttonbase/ButtonBase';
import {FC, memo, useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const CancelButton: FC<ButtonBaseProps> = memo(({style, ...rest}) => {
  const finalStyles = useMemo(() => {
    return StyleSheet.flatten([styles.common, style]);
  }, [style]);
  return <ButtonBase {...rest} style={finalStyles} />;
});

const styles = StyleSheet.create({
  common: {
    backgroundColor: 'orange',
  },
});
