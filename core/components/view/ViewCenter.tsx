import React, {FC, memo, useMemo} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import ViewContainer, {
  ViewContainerProps,
} from '@core/components/view/ViewContainer';

type Props = ViewContainerProps;
export const ViewCenter: FC<Props> = memo(({style, children, ...rest}) => {
  const finalStyle = useMemo((): StyleProp<ViewStyle> => {
    return StyleSheet.flatten([commonStyle.row, style]);
  }, []);

  return (
    <ViewContainer style={finalStyle} {...rest}>
      {children}
    </ViewContainer>
  );
});

const commonStyle = StyleSheet.create({
  row: {justifyContent: 'center', alignContent: 'center'},
});
