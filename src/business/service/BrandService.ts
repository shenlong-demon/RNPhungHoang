import { BaseService, Dto } from '@core/common';
import { Brand } from '@src/business';
import { BrandRepo } from '@src/business/repository';

export class BrandService extends BaseService<BrandService> {
  private brandRepo: BrandRepo = BrandRepo.shared();

  constructor() {
    super();
  }

  public static shared(): BrandService {
    return this.Instance(BrandService);
  }

  async getBrands(): Promise<Dto<Brand[]>> {
    const sdo: Dto<any[]> = await this.brandRepo.getBrands();
    return this.populate<Brand[]>(sdo);
  }
}
