import {CONSTANTS, Singleton} from '../index';
import {Sdo} from './Sdo';
import {Dto} from './Dto';

export class BaseService<T> extends Singleton<T> {
  constructor() {
    super();
  }
}
