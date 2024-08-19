import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Logger } from '@core/common';
import {
  Asset,
  ImagePickerResponse,
} from 'react-native-image-picker/src/types';
import { ImageFile } from '@core/system';

export class ImagePickerLibrary {
  public static async selectImage(): Promise<ImageFile | null> {
    const options: any = { maxWidth: 500, maxHeight: 500 };
    const result: ImagePickerResponse = await launchImageLibrary(options);
    Logger.log(() => [`ImagePickerLibrary selectImage result`, result]);
    return ImagePickerLibrary.getImage(result);
  }

  public static async capture(): Promise<ImageFile | null> {
    const options: any = { maxWidth: 500, maxHeight: 500 };
    const result: ImagePickerResponse = await launchCamera(options);
    Logger.log(() => [`ImagePickerLibrary launchCamera result`, result]);
    return ImagePickerLibrary.getImage(result);
  }

  private static getImages(res: ImagePickerResponse): ImageFile[] {
    const assets: Asset[] = res.assets || [];
    return assets.map((asset: Asset): ImageFile => {
      return <ImageFile>{
        name: asset.fileName,
        uri: asset.uri,
        path: asset.originalPath || '',
        type: asset.type || '',
      };
    });
  }

  private static getImage(res: ImagePickerResponse): ImageFile | null {
    const images: ImageFile[] = ImagePickerLibrary.getImages(res);
    return images.length === 0 ? null : images[0];
  }
}
