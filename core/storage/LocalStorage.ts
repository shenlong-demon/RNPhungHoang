import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorage {
  public static async save(key: string, data: any | null | undefined): Promise<void> {
    await AsyncStorage.setItem(key, data);
  }

  public static async saveObject(key: string, data: any | null | undefined): Promise<void> {
    const json: string = JSON.stringify(data);
    await LocalStorage.save(key, json);
  }

  public static async getString(
    key: string,
    defaultValue?: string | null | undefined
  ): Promise<string | null | undefined> {
    const val: string | null = await AsyncStorage.getItem(key);
    return val || defaultValue;
  }

  public static async getObject<T>(key: string): Promise<T | null> {
    try {
      const val: string | null = await LocalStorage.getString(key);
      return JSON.parse(val) as T | null;
    } catch (e) {}
    return null;
  }
}
