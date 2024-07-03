import {Dto, Singleton} from '../index';
import {WebApi} from '../webapi/WebApi';
import {ApiResult} from '../webapi/ApiResult';

export class BaseRepo<T> extends Singleton<T> {
  protected api: WebApi = WebApi.shared();

  constructor() {
    super();
  }

  protected populate<T>(res: ApiResult): Dto<T> {
    return new Dto<T>(res.code, res.message, res.data);
  }
}
