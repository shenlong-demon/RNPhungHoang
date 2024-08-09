import { ReportFacade } from '@src/business/facade/ReportFacade';
import {
  CloseOutReport,
  CloseOutReportRequest,
  GetCloseOutReportsRequest,
} from '@src/business';
import { Dto } from '@core/common';

type CloseOutReportFacadeResult = {
  doCloseOutReport: (selectedData: number) => Promise<void>;
  getCloseOutReportsInMonth: (
    selectedMonth: number,
  ) => Promise<Dto<CloseOutReport[]>>;
};

export const useCloseOutReportFacade = (): CloseOutReportFacadeResult => {
  const facade: ReportFacade = ReportFacade.shared();
  const doCloseOutReport = async (selectedData: number): Promise<void> => {
    await facade.doCloseOutReport({
      date: selectedData,
    } as CloseOutReportRequest);
  };
  const getCloseOutReportsInMonth = async (
    selectedMonth: number,
  ): Promise<Dto<CloseOutReport[]>> => {
    return facade.getCloseOutReportsInMonth({
      date: selectedMonth,
    } as GetCloseOutReportsRequest);
  };

  return {
    doCloseOutReport,
    getCloseOutReportsInMonth,
  };
};
