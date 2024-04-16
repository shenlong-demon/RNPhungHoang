import { Utility } from '@core/common';

export class AppUtility {
  public static UUID(): string {
    return Utility.UUID();
  }

  public static now(): Date {
    return new Date();
  }

  public static nowInMili(): number {
    return AppUtility.now().getTime();
  }
}
