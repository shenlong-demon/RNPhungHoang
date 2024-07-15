import {ApiResult, BaseRepo, Dto} from '@core/common';
import {API_URL} from '@src/business';

export class DataRepo extends BaseRepo<DataRepo> {
  constructor() {
    super();
  }

  public static shared(): DataRepo {
    return this.Instance(DataRepo);
  }

  async getAll(): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.get(API_URL.GET_ALL_DATA());
    return this.populate(api);
  }
}
