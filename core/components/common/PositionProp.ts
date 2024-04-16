import { StyleProp, ViewStyle } from 'react-native';

export type PositionProp = {
  position?: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'bottom|right' | undefined;
};

export class PositionUtil {
  public static positionStyle(
    position?: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'bottom|right' | undefined
  ): StyleProp<ViewStyle> {
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
  }
}
