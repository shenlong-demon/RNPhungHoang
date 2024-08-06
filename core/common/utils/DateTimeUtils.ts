export class DateTimeUtils {
  public static now(): number {
    return new Date().getTime();
  }
  public static formatDateTimeString(date: Date): string {
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  }
  public static formatDateString(date: Date): string {
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'short',
    }).format(date);
  }
}
