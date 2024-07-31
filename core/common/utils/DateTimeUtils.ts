export class DateTimeUtils {
  public static now(): number {
    return new Date().getTime();
  }
  public static formatDateTimeString(date: Date): string {
    return date.toLocaleString();
  }
}
