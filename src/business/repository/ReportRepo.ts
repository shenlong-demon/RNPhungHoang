import { ApiResult, BaseRepo, Dto } from '@core/common';
import {
  API_URL,
  CloseOutReportRequest,
  CreateBrandRequest,
  CreateGroupRequest,
  GetCloseOutReportsRequest,
  UpdateBrandRequest,
  UpdateGroupRequest,
} from '@src/business';

export class ReportRepo extends BaseRepo<ReportRepo> {
  constructor() {
    super();
  }

  public static shared(): ReportRepo {
    return this.Instance(ReportRepo);
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

  public async doCloseOutReport(
    req: CloseOutReportRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.post(
      API_URL.DO_CLOSE_OUT_REPORT(),
      req,
    );
    return this.populate(api);
  }

  public async getCloseOutReportsInMonth(
    req: GetCloseOutReportsRequest,
  ): Promise<Dto<any[]>> {
    const api: ApiResult = await this.api.post(
      API_URL.GET_CLOSE_OUT_REPORT(),
      req,
    );
    return this.populate(api);
  }
}
