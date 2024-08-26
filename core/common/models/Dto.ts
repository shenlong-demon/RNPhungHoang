import { CONSTANTS, RESULT_CODE } from '@core/common';

export class Dto<T> {
  public code: number = RESULT_CODE.SUCCESS;
  public data: T | null | undefined;
  public message: string | null | undefined;
  public extraData?: any | null | undefined;

  constructor(
    code: number,
    message?: string | null | undefined,
    data?: T | null | undefined,
  ) {
    this.code = code;
    this.data = data;
    this.message = message;
  }

  public next(): boolean {
    return !this.isError();
  }

  public isError(): boolean {
    return !!(this.code & RESULT_CODE.ERROR);
  }

  public isWarning(): boolean {
    return !!(this.code & RESULT_CODE.WARNING);
  }

  public bypass(): Dto<null> {
    return new Dto<null>(this.code, this.message);
  }

  public getCode(): number {
    return this.code & RESULT_CODE.MASK;
  }

  public static success<T>(data: T | null | undefined): Dto<T> {
    return new Dto<T>(RESULT_CODE.SUCCESS, CONSTANTS.STR_EMPTY, data);
  }

  public static error(code: number, message?: string): Dto<null> {
    return new Dto<null>(RESULT_CODE.ERROR | code, message, null);
  }

  public static default(): Dto<null> {
    return new Dto<null>(RESULT_CODE.ERROR, CONSTANTS.STR_EMPTY, null);
  }
}
