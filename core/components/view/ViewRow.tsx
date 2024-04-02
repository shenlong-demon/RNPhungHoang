import React, {FC, memo, useMemo} from 'react';
import {StyleProp, ViewStyle, View, StyleSheet} from 'react-native';
import ViewContainer, {ViewContainerProps} from "@core/components/view/ViewContainer";

type Props = ViewContainerProps;
const ViewRpw: FC<Props> = ({
                                      styles,
                                      children,
                                      position,
                                      alignChildren,
                                    ...rest
                                  }) => {
    const finalStyle = useMemo((): StyleProp<ViewStyle> => {
        return StyleSheet.flatten([commonStyle.row, styles]);
    }, []);

    return <ViewContainer styles={finalStyle} {...rest}  >{children}</ViewContainer>;
};
ViewRpw.displayName = 'View.Row';

export default memo(ViewRpw);

const commonStyle = StyleSheet.create({
    row: {height: 50, justifyContent: 'space-between', flexDirection: 'row'}
});
