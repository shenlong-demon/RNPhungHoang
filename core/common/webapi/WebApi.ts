import {CONSTANTS, Logger, Singleton} from '../index';
import {ApiResult} from './ApiResult';
import Axios, {AxiosResponse} from 'axios';

export class WebApi extends Singleton<WebApi> {
  private getToken: (() => Promise<string>) | null = null;
  private readonly api = Axios.create({
    timeout: 60 * 1000,
  });

  constructor() {
    super();
  }

  public static shared(): WebApi {
    return WebApi.Instance(WebApi);
  }

  public setGetToken(func: () => Promise<string>): void {
    this.getToken = func;
  }

  public async post(url: string, data: any | null): Promise<ApiResult> {
    Logger.log(() => [`POST ${url}`, data]);
    const headers = await this.createHeader();
    let res: ApiResult;
    try {
      const response: AxiosResponse = await this.api.post(url, data, {headers});
      res = this.handle(response);
      Logger.log(() => [`POST ${url} RETURN `, headers, data, response, res]);
    } catch (ex) {
      res = this.catchException(ex);
      Logger.log(() => [`POST ${url} ERROR`, headers, data, res]);
    }
    return res;
  }
  public async put(url: string, data: any | null): Promise<ApiResult> {
    Logger.log(() => [`PUT ${url}`, data]);
    const headers = await this.createHeader();
    let res: ApiResult;
    try {
      const response: AxiosResponse = await this.api.put(url, data, {headers});
      res = this.handle(response);
      Logger.log(() => [`PUT ${url} RETURN `, headers, data, response, res]);
    } catch (ex) {
      res = this.catchException(ex);
      Logger.log(() => [`PUT ${url} ERROR`, headers, data, res]);
    }
    return res;
  }

  public async get(url: string): Promise<ApiResult> {
    Logger.log(() => [`GET ${url}`]);
    const headers = await this.createHeader();
    let res: ApiResult;
    try {
      const response: AxiosResponse = await this.api.get(url, {headers});
      res = this.handle(response);
      Logger.log(() => [`GET ${url} RETURN `, headers, response, res]);
    } catch (ex) {
      res = this.catchException(ex);
      Logger.log(() => [`GET ${url} ERROR`, headers, res]);
    }
    return res;
  }

  private handle(response: AxiosResponse): ApiResult {
    return {...response.data};
  }

  private catchException(error: any | null): ApiResult {
    const res: ApiResult = {
      code: 500,
    };
    if (!!error) {
      if (!!error.response) {
        return {
          code: 500,
          message: error.response.statusText,
        };
      }
    }
    return res;
  }

  private async createHeader(
    contentType?: string | undefined,
  ): Promise<Record<string, string>> {
    let header = {
      ['Content-Type']: !!contentType ? contentType : 'application/json',
    };

    const token: string = !!this.getToken
      ? await this.getToken()
      : CONSTANTS.STR_EMPTY;
    const bearerToken: string = `Bearer ${token}`;
    header = {
      ...header,
      ...(!!token
        ? {
            Authorization: bearerToken,
            token: bearerToken,
          }
        : {}),
    };
    Logger.log(() => [`WebApi createHeader token ${token} `, header]);
    return header;
  }
}
