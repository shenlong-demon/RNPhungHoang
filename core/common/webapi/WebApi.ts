import { CONSTANTS, Logger, RESULT_CODE, Singleton } from '../index';
import { ApiResult } from './ApiResult';
import Axios, { AxiosResponse } from 'axios';
import { ENV } from '@src/business';

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
      const response: AxiosResponse = await this.api.post(url, data, {
        headers,
      });
      res = this.handle(url, data, response);
      Logger.log(() => [`POST ${url} RETURN `, headers, data, response, res]);
    } catch (ex) {
      res = this.catchException(url, data, ex);
      Logger.log(() => [`POST ${url} ERROR`, headers, data, ex, res]);
    }
    return res;
  }

  public async put(url: string, data: any | null): Promise<ApiResult> {
    Logger.log(() => [`PUT ${url}`, data]);
    const headers = await this.createHeader();
    let res: ApiResult;
    try {
      const response: AxiosResponse = await this.api.put(url, data, {
        headers,
      });
      res = this.handle(url, data, response);
      Logger.log(() => [`PUT ${url} RETURN `, headers, data, response, res]);
    } catch (ex) {
      res = this.catchException(url, data, ex);
      Logger.log(() => [`PUT ${url} ERROR`, headers, data, ex, res]);
    }
    return res;
  }

  public async get(url: string): Promise<ApiResult> {
    Logger.log(() => [`GET ${url}`]);
    const headers = await this.createHeader();
    let res: ApiResult;
    try {
      const response: AxiosResponse = await this.api.get(url, { headers });
      res = this.handle(url, null, response);
      Logger.log(() => [`GET ${url} RETURN `, headers, response, res]);
    } catch (ex) {
      res = this.catchException(url, null, ex);
      Logger.log(() => [`GET ${url} ERROR`, headers, ex, res]);
    }
    return res;
  }

  public async delete(url: string): Promise<ApiResult> {
    Logger.log(() => [`DELETE ${url}`]);
    const headers = await this.createHeader();
    let res: ApiResult;
    try {
      const response: AxiosResponse = await this.api.delete(url, { headers });
      res = this.handle(url, null, response);
      Logger.log(() => [`DELETE ${url} RETURN `, headers, response, res]);
    } catch (ex) {
      res = this.catchException(url, null, ex);
      Logger.log(() => [`DELETE ${url} ERROR`, headers, ex, res]);
    }
    return res;
  }

  private handle(
    url: string,
    data: any | null,
    response: AxiosResponse,
  ): ApiResult {
    return { ...response.data, extraData: { url, data } };
  }

  private catchException(
    url: string,
    data: any | null,
    error: any | null,
  ): ApiResult {
    Logger.logEvent(`===== ${ENV.ENV} - ${url} =====`, {
      url,
      data,
      error,
    });
    let res: ApiResult = {
      code: 500,
    };
    if (!!error) {
      if (!!error.response) {
        const httpCode: number = error.response.status;
        res = {
          code: RESULT_CODE.ERROR | httpCode,
          message:
            httpCode === 401
              ? 'Your Login is expired !. Please login again'
              : `Server Error (${httpCode}) !!!`,
          data: error.response.data,
        };
      } else {
        res = {
          code: RESULT_CODE.ERROR | 500,
          message: 'Server Error !!!',
          data: error,
        };
      }
    }
    res.extraData = {
      url,
      data,
      error,
    };
    return res;
  }

  private async createHeader(
    contentType?: string | undefined,
  ): Promise<Record<string, string>> {
    let header = {
      'Content-Type': !!contentType ? contentType : 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
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
    return header;
  }
}
