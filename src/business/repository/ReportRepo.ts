import { ApiResult, BaseRepo, Dto } from '@core/common';
import {
  API_URL,
  CloseOutReportRequest,
  GetCloseOutReportsRequest,
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
