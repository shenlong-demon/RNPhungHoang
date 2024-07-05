import React, {FC, memo, ReactNode, useMemo} from 'react';
import {ImageProps, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

export interface ImageBaseProps extends ImageProps {
  canSetSource?: boolean;
}
const ImageBase: FC<ImageBaseProps> = ({canSetSource, style, ...rest}) => {
  const finalStyles = useMemo(() => {
    return StyleSheet.flatten([styles.common, style]);
  }, [style]);

  const setSource = (): void => {};

  const image = useMemo(() => {
    return <FastImage {...rest} style={finalStyles} />;
  }, [finalStyles]);

  return !canSetSource ? (
    image
  ) : (
    <TouchableOpacity onPress={setSource}>{image}</TouchableOpacity>
  );
};

export default memo(ImageBase);

const styles = StyleSheet.create({
  common: {
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

type Props = {
  children: ReactNode;
};
