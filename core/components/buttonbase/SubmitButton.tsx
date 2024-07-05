import ButtonBase, {
  ButtonBaseProps,
} from '@core/components/buttonbase/ButtonBase';
import {FC, memo, useMemo} from 'react';
import {StyleSheet} from 'react-native';

const SubmitButton: FC<ButtonBaseProps> = ({style, ...rest}) => {
  const finalStyles = useMemo(() => {
    return StyleSheet.flatten([styles.common, style]);
  }, [style]);
  return <ButtonBase {...rest} style={finalStyles} />;
};

const styles = StyleSheet.create({
  common: {
    height: 60,
    borderRadius: 5,
    margin: 10,
    backgroundColor: 'green',
  },
});
export default memo(SubmitButton);
