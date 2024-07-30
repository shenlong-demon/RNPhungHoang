import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import ViewBase, {ViewBaseProps} from '@core/components/viewbase/ViewBase';

export const ViewCenter: FC<ViewBaseProps> = memo((props: ViewBaseProps) => {
  const finalStyles = StyleSheet.flatten([styles.common, props.style]);

  return (
    <ViewBase {...props} style={finalStyles}>
      {props.children}
    </ViewBase>
  );
});

const styles = StyleSheet.create({
  common: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
