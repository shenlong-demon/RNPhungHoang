import { BaseService, Dto } from '@core/common';
import { ReportRepo } from '@src/business/repository';
import {
  CloseOutReport,
  CloseOutReportRequest,
  GetCloseOutReportsRequest,
} from '@src/business';

export class ReportService extends BaseService<ReportService> {
  private reportRepo: ReportRepo = ReportRepo.shared();

  constructor() {
    super();
  }

  public static shared(): ReportService {
    return this.Instance(ReportService);
  }

  public async doCloseOutReport(
    req: CloseOutReportRequest,
  ): Promise<Dto<CloseOutReport | null>> {
    return this.reportRepo.doCloseOutReport(req);
  }

  public async getCloseOutReportsInMonth(
    req: GetCloseOutReportsRequest,
  ): Promise<Dto<CloseOutReport[]>> {
    return this.reportRepo.getCloseOutReportsInMonth(req);
  }
}
