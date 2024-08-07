import {ApiResult, BaseRepo, Dto} from '@core/common';
import {API_URL} from '@src/business';

export class BrandRepo extends BaseRepo<BrandRepo> {
  constructor() {
    super();
  }

  public static shared(): BrandRepo {
    return this.Instance(BrandRepo);
  }

  async getBrands(): Promise<Dto<any[]>> {
    const api: ApiResult = await this.api.get(API_URL.GET_BRANDS());
    return this.populate(api);
  }
}
