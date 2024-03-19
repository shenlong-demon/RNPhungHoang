import { Singleton } from '../index';
import { Sdo } from './Sdo';
import {WebApi} from "../webapi/WebApi";
import {ApiResult} from "../webapi/ApiResult";

export class BaseRepo<T> extends Singleton<T> {
  protected api: WebApi = WebApi.shared();
  constructor() {
    super();
  }
  protected populate<T>(res:ApiResult): Sdo<T> {
    return {
      code: res.code,
      message: res.message,
      data: res.data,
      isSuccess: res.code === 0
    };
  }
}
