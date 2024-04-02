import React, {FC, memo, useMemo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from "react-native-gesture-handler";

export type ViewContainerProps = {
  styles?: StyleProp<ViewStyle>;
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
  styles,
  children,
  position,
  alignChildren,
    onPress,
    ...rest
}) => {
  randomColorIndex += 1;
  if(randomColorIndex > 100){
    randomColorIndex = 0;
  }
  const positionStyle = useMemo((): StyleProp<ViewStyle> => {
    let pos: any = {};
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
    return StyleSheet.flatten([commonStyle.view, styles, positionStyle, alignChildrenStyle]);
  }, []);

  const view = () => {
    return <View style={finalStyles}  {...rest}>{children}</View>;
  };


  return (!!onPress ? <TouchableOpacity >{view()}</TouchableOpacity> : view());
};
ViewContainer.displayName = 'View.Container';

const commonStyle = StyleSheet.create({
  view: {
    paddingLeft: 10,
    paddingRight: 10,
  }
});
export default memo(ViewContainer);
