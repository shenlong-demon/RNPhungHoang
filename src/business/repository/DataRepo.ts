import {ApiResult, BaseRepo, Dto} from '@core/common';
import {
  API_URL,
  CreateBrandRequest,
  CreateGroupRequest,
  UpdateBrandRequest,
  UpdateGroupRequest,
} from '@src/business';

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

  async createBrand(req: CreateBrandRequest): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.post(API_URL.CREATE_BRAND(), req);
    return this.populate(api);
  }
  async updateBrand(
    brandId: number,
    req: UpdateBrandRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.UPDATE_BRAND(brandId),
      req,
    );
    return this.populate(api);
  }
  async createGroup(req: CreateGroupRequest): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.post(API_URL.CREATE_GROUP(), req);
    return this.populate(api);
  }
  async updateGroup(
    groupId: number,
    req: UpdateGroupRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.UPDATE_GROUP(groupId),
      req,
    );
    return this.populate(api);
  }
}
