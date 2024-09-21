import safeStringify from 'safe-stringify';

export class JSONUtility {
  public static stringify(obj: any): string {
    try {
      return safeStringify(obj);
    } catch (e) {}
    return 'JSONUtility stringify ERROR';
  }
}
