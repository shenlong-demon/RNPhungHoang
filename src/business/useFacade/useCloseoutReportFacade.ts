import {ReportFacade} from '@src/business/facade/ReportFacade';
import {CloseOutReportRequest} from '@src/business';

type CloseOutReportFacadeResult = {
  doCloseOutReport: (selectedData: number) => Promise<void>;
};

export const useCloseOutReportFacade = (): CloseOutReportFacadeResult => {
  const facade: ReportFacade = ReportFacade.shared();
  const doCloseOutReport = async (selectedData: number): Promise<void> => {
    await facade.doCloseOutReport({
      date: selectedData,
    } as CloseOutReportRequest);
  };

  return {
    doCloseOutReport,
  };
};
