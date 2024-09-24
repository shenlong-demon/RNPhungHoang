import { Keyboard } from 'react-native';

export class DeviceUtility {
  public static isKeyboardShow: boolean = false;

  public static hideKeyboard(): void {
    Keyboard.dismiss();
  }
}
