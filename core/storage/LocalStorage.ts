import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONSTANTS } from '@core/common';

export class LocalStorage {
  public static async save(
    key: string,
    data: any | null | undefined,
  ): Promise<void> {
    await AsyncStorage.setItem(key, data);
  }

  public static async saveObject(
    key: string,
    data: any | null | undefined,
  ): Promise<void> {
    const json: string = JSON.stringify(data);
    await LocalStorage.save(key, json);
  }

  public static async getString(
    key: string,
    defaultValue?: string | null | undefined,
  ): Promise<string | null | undefined> {
    const val: string | null = await AsyncStorage.getItem(key);
    return val || defaultValue;
  }

  public static async getObject<T>(key: string): Promise<T | null> {
    try {
      const val: string | null | undefined = await LocalStorage.getString(key);
      return JSON.parse(val || CONSTANTS.STR_EMPTY) as T | null;
    } catch (e) {}
    return null;
  }

  public static async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}
