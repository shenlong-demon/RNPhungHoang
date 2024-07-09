import React, {FC, memo, useEffect, useMemo, useState} from 'react';
import {ImageProps, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImageFile, ImagePickerLibrary} from '@core/system';
import {File} from '@core/models';

export interface ImageBaseProps extends Omit<ImageProps, 'source>'> {
  canSetSource?: boolean;
  onSourceChanged?: (src: File | null) => void;
  source: File | null;
}

const IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

const ImageBase: FC<ImageBaseProps> = ({
  canSetSource,
  source,
  style,
  onSourceChanged,
  ...rest
}) => {
  const [imageSource, setImageSource] = useState<File | null>(source);
  const finalStyles = useMemo(() => {
    return StyleSheet.flatten([styles.common, style]);
  }, [style]);
  const setSource = async (): Promise<void> => {
    const result: ImageFile | null = await ImagePickerLibrary.selectImage();
    if (!!result) {
      setImageSource(result);
    }
  };
  useEffect(() => {
    !!onSourceChanged && onSourceChanged(imageSource);
  }, [onSourceChanged, imageSource]);

  const onPress = (): void => {
    !!canSetSource && setSource();
  };

  return (
    <Pressable onPress={onPress}>
      <FastImage
        source={!!imageSource ? {uri: imageSource.uri} : {uri: IMG}}
        {...rest}
        style={finalStyles}
      />
    </Pressable>
  );
};

export default memo(ImageBase);

const styles = StyleSheet.create({
  common: {
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
