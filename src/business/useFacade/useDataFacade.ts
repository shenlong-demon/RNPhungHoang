import { DataFacade } from '@src/business/facade';
import { Dto } from '@core/common';
import { DataResult } from '@src/business';

type DataFacadeResult = {
  getAllData: (forceGetNew?: boolean) => Promise<DataResult | null>;
};

export const useDataFacade = (): DataFacadeResult => {
  const facade: DataFacade = DataFacade.shared();

  const getAllData = async (
    forceGetNew?: boolean,
  ): Promise<DataResult | null> => {
    const dto: Dto<DataResult | null> = await facade.getAllData(forceGetNew);
    return dto.data as DataResult;
  };

  return { getAllData };
};
