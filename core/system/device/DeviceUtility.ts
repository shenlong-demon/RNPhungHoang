import { Keyboard } from 'react-native';

export class DeviceUtility {
  public static hideKeyboard(): void {
    Keyboard.dismiss();
  }
}
