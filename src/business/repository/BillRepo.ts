import { ApiResult, BaseRepo, Dto } from '@core/common';
import { API_URL, BillFilterRequest } from '@src/business';

export class BillRepo extends BaseRepo<BillRepo> {
  constructor() {
    super();
  }

  public static shared(): BillRepo {
    return this.Instance(BillRepo);
  }

  async getBillsBy(filter: BillFilterRequest): Promise<Dto<any[]>> {
    const api: ApiResult = await this.api.post(API_URL.GET_BILLS_BY(), filter);
    return this.populate(api);
  }
}
