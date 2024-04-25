import React, {FC, memo, useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, ViewProps} from 'react-native';
import {Button, Label, View} from '@core/components';
import {ImagePickerLibrary} from '@core/system';

export type ImageProps = ImageProps &
  ViewProps & {
    onSourceChanged?: (src: any | null) => void;
    canSetSource?: boolean;
  };
const NormalImage: FC<ImageProps> = ({
  source,
  style,
  onSourceChanged,
  canSetSource,
  ...rest
}) => {
  const [imageSource, setImageSource] = useState<any | null>(source);

  const changeImageSource = async (): Promise<void> => {
    const result: any = await ImagePickerLibrary.selectImage();
  };
  const capturePhoto = async (): Promise<void> => {
    const result: any = await ImagePickerLibrary.capture();
  };

  useEffect(() => {
    !!onSourceChanged && onSourceChanged(imageSource);
  }, [imageSource, onSourceChanged]);

  const finalStyles = useMemo(
    () => StyleSheet.flatten([{...commonStyle.common}, style]),
    [style],
  );

  const image = useMemo(() => {
    return !imageSource ? null : (
      <Image source={imageSource || ''} {...rest} style={finalStyles} />
    );
  }, [canSetSource, imageSource]);

  return (
    <View.V style={{flex: 1}} onPress={changeImageSource}>
      {!imageSource && (
        <>
          <View.Row>
            <Label.Text text={'Photo is not net'} />
          </View.Row>
          <View.Row>
            <Button.B label={'Select Photo'} onPress={changeImageSource} />
            <Button.B label={'Capture ...'} onPress={capturePhoto} />
          </View.Row>
        </>
      )}
      {image}
    </View.V>
  );
};
export default memo(NormalImage);

const commonStyle = StyleSheet.create({
  common: {
    flex: 1,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
