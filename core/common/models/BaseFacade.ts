import {Singleton} from '../index';

export default class BaseFacade<T> extends Singleton<T> {
  protected handler: any | null;

  constructor(handler?: any | null | undefined) {
    super();
    this.handler = handler || null;
  }
}
