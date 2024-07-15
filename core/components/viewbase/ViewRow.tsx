import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import ViewBase, {ViewBaseProps} from '@core/components/viewbase/ViewBase';

export const ViewRow: FC<ViewBaseProps> = memo((props: ViewBaseProps) => {
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
    // flex: 1,
    height: 48,
    flexDirection: 'row',
    // // justifyContent: 'center',
    // // alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
