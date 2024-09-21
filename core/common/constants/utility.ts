import uuid from 'react-native-uuid';

export class Utility {
  public static UUID(): string {
    return uuid.v4() as string;
  }

  public static now(): number {
    return new Date().getTime();
  }

  public static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
