import BaseFacade from '@core/common/models/BaseFacade';
import {Dto, Fto} from '@core/common';
import {AuthService} from '@src/business/service/AuthService';
import {Brand, BrandService, User} from '@src/business';

export class BrandFacade extends BaseFacade<BrandFacade> {
  private brandService: BrandService = BrandService.shared();
  constructor() {
    super();
  }
  public static shared(): BrandFacade {
    return this.Instance(BrandFacade);
  }

  async getBrands(): Promise<Fto<Brand[]>> {
    const dto: Dto<Brand[]> = await this.brandService.getBrands();
    return this.populate<Brand[]>(dto);
  }
}
