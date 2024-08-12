export class DateTimeUtils {
  public static now(): number {
    return new Date().getTime();
  }

  public static formatDateTimeStringByDate(date: Date): string {
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  }

  public static formatDateTimeString(time: number): string {
    return DateTimeUtils.formatDateTimeStringByDate(new Date(time));
  }

  public static formatDateString(date: Date): string {
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'short',
    }).format(date);
  }
}
