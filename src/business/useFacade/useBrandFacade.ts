import {BrandFacade, LoginFacade} from '@src/business/facade';
import {Fto} from '@core/common';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';
import {Brand, User} from '@src/business';

type BrandFacadeResult = {
  getBrands: () => Promise<Brand[]>;
};

export const useBrandFacade = (): BrandFacadeResult => {
  const facade: BrandFacade = BrandFacade.shared();
  const {replace} = useNavigation();
  const getBrands = async (): Promise<Brand[]> => {
    // setLoading
    const fto: Fto<Brand[]> = await facade.getBrands();
    if (fto.isSuccess) {
      replace(Route.MAIN);
    }
    // setLoading
    return fto.data;
  };

  return {getBrands};
};
