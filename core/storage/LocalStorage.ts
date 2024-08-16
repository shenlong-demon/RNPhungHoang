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

  public static async getObjectsByWildcard<T>(wildcard: string): Promise<T[]> {
    const keys: string[] = await LocalStorage.getAllKeysByWildcard(wildcard);
    const res: T[] = [];
    for (const key of keys) {
      const data: T | null = await this.getObject<T>(key);
      if (!!data) {
        res.push(data);
      }
    }

    return res;
  }

  public static async getAllKeysByWildcard(
    wildcard: string,
  ): Promise<string[]> {
    const keys: string[] = (await AsyncStorage.getAllKeys()) as string[];
    return keys.filter((key: string): boolean => {
      return key.toLowerCase().indexOf(wildcard.toLowerCase()) > -1;
    });
  }

  static async removeObjectsByWildcard(wildcard: string): Promise<void> {
    const keys: string[] = await LocalStorage.getAllKeysByWildcard(wildcard);
    for (const key of keys) {
      await LocalStorage.remove(key);
    }
  }
}
