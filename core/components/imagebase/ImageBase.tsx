import React, {FC, memo, useEffect, useState} from 'react';
import {ImageProps, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImageFile, ImagePickerLibrary} from '@core/system';
import {File} from '@core/models';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';

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
  const finalStyles = StyleSheet.flatten([styles.common, style]);
  const capture = async (): Promise<void> => {
    const result: ImageFile | null = await ImagePickerLibrary.capture();
    if (!!result) {
      setImageSource(result);
    }
  };
  const select = async (): Promise<void> => {
    const result: ImageFile | null = await ImagePickerLibrary.selectImage();
    if (!!result) {
      setImageSource(result);
    }
  };

  useEffect(() => {
    !!onSourceChanged && onSourceChanged(imageSource);
  }, [onSourceChanged, imageSource]);

  const getImage = (): any => {
    return (
      <FastImage
        source={!!imageSource ? {uri: imageSource.uri} : {uri: IMG}}
        style={finalStyles}
        {...rest}
      />
    );
  };

  return (
    <View.V>
      {getImage()}
      {canSetSource ? (
        <View.V
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <Button.B
            style={[styles.button, {backgroundColor: '#faf1b6'}]}
            onPress={capture}
            label={'Capture'}
          />
          <Button.B
            style={[styles.button, {backgroundColor: '#c0efff'}]}
            onPress={select}
            label={'Select'}
          />
        </View.V>
      ) : null}
    </View.V>
  );
};

export default memo(ImageBase);

const styles = StyleSheet.create({
  common: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
  },
  button: {
    // flex: 1,
    opacity: 0.9,
    minWidth: 100,
  },
});
