import React, { FC, memo, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import ViewContainer, { ViewContainerProps } from '@core/components/view/ViewContainer';

type Props = ViewContainerProps;
const ViewRpw: FC<Props> = ({ style, children, position, alignChildren, ...rest }) => {
  const finalStyle = useMemo((): StyleProp<ViewStyle> => {
    return StyleSheet.flatten([commonStyle.row, style]);
  }, []);

  return (
    <ViewContainer style={finalStyle} {...rest}>
      {children}
    </ViewContainer>
  );
};
ViewRpw.displayName = 'View.Row';

export default memo(ViewRpw);

const commonStyle = StyleSheet.create({
  row: { height: 50, justifyContent: 'space-between', flexDirection: 'row' },
});
