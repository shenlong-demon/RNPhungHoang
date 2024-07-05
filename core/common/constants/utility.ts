import uuid from 'react-native-uuid';

export class Utility {
  public static UUID(): string {
    return uuid.v4() as string;
  }
  public static now(): number {
    return new Date().getTime();
  }
}
