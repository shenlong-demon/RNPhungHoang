import {ApiResult, BaseRepo, Dto, Sdo} from '@core/common';
import {API_URL} from '@src/business';

export class BrandRepo extends BaseRepo<BrandRepo> {
  constructor() {
    super();
  }
  public static shared(): BrandRepo {
    return this.Instance(BrandRepo);
  }


}
