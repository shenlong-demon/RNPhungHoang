import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Logger } from '@core/common';

export class ImagePickerLibrary {
  public static async selectImage(): Promise<any> {
    const options: any = {};
    const result = await launchImageLibrary(options);
    Logger.log(() => [`ImagePickerLibrary selectImage result`, result]);
  }
  public static async capture(): Promise<any> {
    const options: any = {};
    const result = await launchCamera(options);
    Logger.log(() => [`ImagePickerLibrary launchCamera result`, result]);
  }
}
