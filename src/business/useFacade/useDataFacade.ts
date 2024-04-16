import { DataFacade } from '@src/business/facade';
import { Fto } from '@core/common';
import { Brand, Group } from '@src/business';

type DataFacadeResult = {
  getBrands: () => Promise<Brand[]>;
  getGroups: () => Promise<Group[]>;
};

export const useDataFacade = (): DataFacadeResult => {
  const facade: DataFacade = DataFacade.shared();
  const getBrands = async (): Promise<Brand[]> => {
    const fto: Fto<Brand[]> = await facade.getBrands();
    return fto.data;
  };
  const getGroups = async (): Promise<Group[]> => {
    const fto: Fto<Group[]> = await facade.getGroups();
    return fto.data;
  };

  return { getBrands, getGroups };
};
