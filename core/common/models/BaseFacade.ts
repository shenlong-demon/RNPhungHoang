import { Singleton } from '../index';
import { Dto } from './Dto';
import { Fto } from './Fto';

export default class BaseFacade<T> extends Singleton<T> {
  protected handler: any | null;

  constructor(handler?: any | null | undefined) {
    super();
    this.handler = handler || null;
  }

  protected populate<D>(dto: Dto<D>): Fto<D> {
    return {
      code: dto.code,
      data: dto.data,
      isSuccess: dto.isSuccess,
    };
  }

  protected failed(code: string, message?: string | null | undefined): Fto<null> {
    return {
      code: code,
      data: null,
      isSuccess: false,
      message: message,
    };
  }
}
