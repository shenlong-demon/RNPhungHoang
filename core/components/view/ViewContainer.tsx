import React, {FC, memo, useMemo} from 'react';
import {StyleProp, ViewStyle, View, StyleSheet} from 'react-native';

type Props = {
  styles?: StyleProp<ViewStyle>;
  children?: JSX.Element[] | JSX.Element;
  position?: 'left' | 'right' | 'top' | 'bottom' | 'center' | undefined;
  alignChildren?:
    | 'center'
    | 'left'
    | 'right'
    | 'vertical'
    | 'horizontal'
    | 'center|vertical'
    | undefined;
};
const ViewContainer: FC<Props> = ({
  styles,
  children,
  position,
  alignChildren,
}) => {
  const positionStyle = useMemo((): StyleProp<ViewStyle> => {
    const pos: any = {};
    if (!!position) {
      pos.position = 'absolute';
      const positionStr: string = position.toLowerCase();
      if (positionStr.indexOf('top') >= 0) {
        pos.top = 0;
      }
      if (positionStr.indexOf('left') >= 0) {
        pos.left = 0;
      }
      if (positionStr.indexOf('right') >= 0) {
        pos.right = 0;
      }
      if (positionStr.indexOf('bottom') >= 0) {
        pos.bottom = 0;
      }
    }
    return pos;
  }, []);

  const alignChildrenStyle = useMemo((): StyleProp<ViewStyle> => {
    const align: any = {};
    if (!!alignChildren) {
      const alignChildrenStr: string = alignChildren.toLowerCase();
      if (alignChildrenStr.indexOf('center') >= 0) {
        if (alignChildrenStr.indexOf('vertical') >= 0) {
          align.alignItems = 'center';
        }
        if (alignChildrenStr.indexOf('horizontal') >= 0) {
          align.justifyContent = 'center';
        }
      }
    }

    return align;
  }, []);
  const contentStyle = useMemo((): StyleProp<ViewStyle> => {
    return StyleSheet.flatten([styles, positionStyle, alignChildrenStyle]);
  }, []);
  return <View style={contentStyle}>{children}</View>;
};
ViewContainer.displayName = 'View.Container';

export default memo(ViewContainer);
