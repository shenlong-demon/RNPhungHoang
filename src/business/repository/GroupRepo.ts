import {ApiResult, BaseRepo, Dto} from '@core/common';
import {API_URL} from '@src/business';

export class GroupRepo extends BaseRepo<GroupRepo> {
  constructor() {
    super();
  }

  public static shared(): GroupRepo {
    return this.Instance(GroupRepo);
  }

  async getGroups(): Promise<Dto<any[]>> {
    const api: ApiResult = await this.api.get(API_URL.GET_GROUPS());
    return this.populate(api);
  }
}
