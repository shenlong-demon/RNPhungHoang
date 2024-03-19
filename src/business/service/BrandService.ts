import {BaseService, Dto, Sdo} from '@core/common';
import {AuthRepo} from '@src/business/repository/AuthRepo';
import {Brand, User} from '@src/business';

export class BrandService extends BaseService<BrandService> {
  private brandRepo: AuthRepo = AuthRepo.shared();
  constructor() {
    super();
  }
  public static shared(): BrandService {
    return this.Instance(BrandService);
  }

  async getBrands(): Promise<Dto<Brand[]>> {
    const sdo: Sdo<any[]> = await this.brandRepo.getBrands();
    return this.populate<Brand[]>(sdo);
  }
}
