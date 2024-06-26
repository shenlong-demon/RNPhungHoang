import React, {FC, memo, useMemo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PositionUtil} from '@core/components/common';

export type ViewContainerProps = {
  style?: StyleProp<ViewStyle>;
  children?: JSX.Element[] | JSX.Element;
  position?: 'left' | 'right' | 'top' | 'bottom' | 'center' | undefined;
  alignChildren?:
    | 'center'
    | 'left'
    | 'right'
    | 'vertical'
    | 'horizontal'
    | 'center|horizontal'
    | 'center|vertical'
    | undefined;
  onPress?: (() => void) | undefined;
};

let randomColors = ['red', 'yellow', 'green', 'blue'];
let randomColorIndex: number = 0;
const ViewContainer: FC<ViewContainerProps> = ({
  style,
  children,
  position,
  alignChildren,
  onPress,
  ...rest
}) => {
  randomColorIndex += 1;
  if (randomColorIndex > 100) {
    randomColorIndex = 0;
  }
  const positionStyle = useMemo((): StyleProp<ViewStyle> => {
    return PositionUtil.positionStyle(position);
  }, []);

  const alignChildrenStyle = useMemo((): StyleProp<ViewStyle> => {
    let align: any = {};
    if (!!alignChildren) {
      const alignChildrenStr: string = alignChildren.toLowerCase();
      if (alignChildrenStr.indexOf('center') >= 0) {
        if (alignChildrenStr.indexOf('vertical') >= 0) {
          align.alignItems = 'center';
        }
        if (alignChildrenStr.indexOf('horizontal') >= 0) {
          align.justifyContent = 'center';
          align.flexDirection = 'row';
        }
      }
    }

    return align;
  }, []);

  const finalStyles = useMemo((): StyleProp<ViewStyle> => {
    return StyleSheet.flatten([
      commonStyle.view,
      style,
      positionStyle,
      alignChildrenStyle,
    ]);
  }, [style]);

  const view = () => {
    return (
      <View style={finalStyles} {...rest}>
        {children}
      </View>
    );
  };

  return !!onPress ? (
    <TouchableOpacity onPress={onPress}>{view()}</TouchableOpacity>
  ) : (
    view()
  );
};
ViewContainer.displayName = 'View.Container';

const commonStyle = StyleSheet.create({
  view: {
    // flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
export default memo(ViewContainer);
