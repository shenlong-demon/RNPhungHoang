import { CONSTANTS, Singleton } from '../index';
import { Sdo } from './Sdo';
import { Dto } from './Dto';

export class BaseService<T> extends Singleton<T> {
  constructor() {
    super();
  }

  protected populate<T>(sdo: Sdo<any>): Dto<T> {
    return {
      code: sdo.code,
      data: sdo.data as T,
      message: sdo.message,
      isSuccess: `${sdo.code}` === `0`,
    };
  }

  protected populateData<T>(sdo: Sdo<T>, data: T | null): Dto<T> {
    return {
      code: sdo.code,
      data,
      message: sdo.message,
      isSuccess: `${sdo.code}` === '0',
    };
  }

  protected successDto<T>(data: T): Dto<T> {
    return {
      code: `0`,
      data,
      message: CONSTANTS.STR_EMPTY,
      isSuccess: true,
    };
  }
}
