import {DataFacade} from '@src/business/facade';
import {Dto} from '@core/common';
import {Brand, Group} from '@src/business';

type DataFacadeResult = {
  getBrands: () => Promise<Brand[]>;
  getGroups: () => Promise<Group[]>;
};

export const useDataFacade = (): DataFacadeResult => {
  const facade: DataFacade = DataFacade.shared();
  const getBrands = async (): Promise<Brand[]> => {
    const dto: Dto<Brand[]> = await facade.getBrands();
    return dto.data || [];
  };
  const getGroups = async (): Promise<Group[]> => {
    const dto: Dto<Group[]> = await facade.getGroups();
    return dto.data || [];
  };

  return {getBrands, getGroups};
};
