
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ObjectUtils} from "@core/common";

export class StorageUtils {
    public static async setItem(key: string, value: string, callback?: (error?: Error) => void): Promise<void> {
        await AsyncStorage.setItem(key, value, callback);
    }

    public static async getItem(key: string): Promise<string> {
        return await AsyncStorage.getItem(key);
    }

    public static async setJSON(key: string, item: any): Promise<void> {
        await AsyncStorage.setItem(key, ObjectUtils.stringify(item));
    }

    public static async getJSON(key: string): Promise<any> {
        const value = await AsyncStorage.getItem(key);

        if (ObjectUtils.isEmpty(value)) {
            return null;
        }

        return ObjectUtils.parse(value);
    }

    public static async removeItem(key: string): Promise<void> {
        await AsyncStorage.removeItem(key);
    }

    public static async clear(callback?: (error?: Error) => void): Promise<void> {
        await AsyncStorage.clear(callback);
    }
}
