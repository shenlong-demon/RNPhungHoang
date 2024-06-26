import React, {FC, memo, useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, ViewProps} from 'react-native';
import {View} from '@core/components';
import {ImageFile, ImagePickerLibrary} from '@core/system';
import {File} from '@core/models';

export type ImageProps = ViewProps & {
  source: File | null;
  onSourceChanged?: (src: File | null) => void;
  canSetSource?: boolean;
};

const IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

const NormalImage: FC<ImageProps> = ({
  source,
  style,
  onSourceChanged,
  canSetSource,
  ...rest
}) => {
  const [imageSource, setImageSource] = useState<File | null>(source);

  const changeImageSource = async (): Promise<void> => {
    const result: ImageFile | null = await ImagePickerLibrary.selectImage();
    if (!!result) {
      setImageSource(result);
    }
  };
  // const capturePhoto = async (): Promise<void> => {
  //   const result: any = await ImagePickerLibrary.capture();
  // };

  useEffect(() => {
    !!onSourceChanged && onSourceChanged(imageSource);
  }, [imageSource]);

  const finalStyles = useMemo(
    () => StyleSheet.flatten([{...commonStyle.common}, style]),
    [style],
  );

  const image = useMemo(() => {
    return !imageSource ? null : (
      <Image {...rest} source={imageSource} style={finalStyles} />
    );r
  }, [canSetSource, imageSource]);

  return (
    <View.V style={finalStyles} onPress={changeImageSource}>
      {/*{!imageSource && (*/}
      {/*  <>*/}
      {/*    <View.Row>*/}
      {/*      <Label.Text text={'Photo is not net'} />*/}
      {/*    </View.Row>*/}
      {/*    <View.Row>*/}
      {/*      <Button.B label={'Select Photo'} onPress={changeImageSource} />*/}
      {/*      <Button.B label={'Capture ...'} onPress={capturePhoto} />*/}
      {/*    </View.Row>*/}
      {/*  </>*/}
      {/*)}*/}
      {/*{image}*/}
      <Image
        source={!!imageSource ? {...imageSource} : {uri: IMG}}
        style={{width: 100, height: 100}}
      />
    </View.V>
  );
};
export default memo(NormalImage);

const commonStyle = StyleSheet.create({
  common: {
    resizeMode: 'contain',
    borderRadius: 10,
    width: 100,
    height: 100,
    backgroundColor: 'yellow',
  },
});
