import {ApiResult, BaseRepo, Dto, Sdo} from '@core/common';
import {API_URL} from '@src/business';

export class AuthRepo extends BaseRepo<AuthRepo> {
  constructor() {
    super();
  }
  public static shared(): AuthRepo {
    return this.Instance(AuthRepo);
  }

  async login(phone: string, password: string): Promise<Sdo<any>> {
    const api: ApiResult = await this.api.post(API_URL.LOGIN(), {
      phone,
      password,
    });
    return this.populate(api);
  }

  async getBrands(): Promise<Sdo<any[]>> {
    const api: ApiResult = await this.api.get(API_URL.GET_BRANDS());
    return this.populate(api);
  }
}
