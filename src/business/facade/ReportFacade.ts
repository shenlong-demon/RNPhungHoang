import BaseFacade from '@core/common/models/BaseFacade';
import { Dto } from '@core/common';
import {
  CloseOutReport,
  CloseOutReportRequest,
  GetCloseOutReportsRequest,
  ReportService,
} from '@src/business';

export class ReportFacade extends BaseFacade<ReportFacade> {
  private readonly IMAGE_FOLDER: string = 'Customer';
  private reportService: ReportService = ReportService.shared();

  constructor() {
    super();
  }

  public static shared(): ReportFacade {
    return this.Instance(ReportFacade);
  }

  public async doCloseOutReport(
    req: CloseOutReportRequest,
  ): Promise<Dto<CloseOutReport | null>> {
    return this.reportService.doCloseOutReport(req);
  }

  public async getCloseOutReportsInMonth(
    req: GetCloseOutReportsRequest,
  ): Promise<Dto<CloseOutReport[]>> {
    return this.reportService.getCloseOutReportsInMonth(req);
  }
}
