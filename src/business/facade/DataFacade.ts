import BaseFacade from '@core/common/models/BaseFacade';
import { Dto, Fto } from '@core/common';
import { Brand, BrandService, Group } from '@src/business';
import { GroupService } from '@src/business/service/GroupService';

export class DataFacade extends BaseFacade<DataFacade> {
  private brandService: BrandService = BrandService.shared();
  private groupService: GroupService = GroupService.shared();

  constructor() {
    super();
  }

  public static shared(): DataFacade {
    return this.Instance(DataFacade);
  }

  async getBrands(): Promise<Fto<Brand[]>> {
    const dto: Dto<Brand[]> = await this.brandService.getBrands();
    return this.populate<Brand[]>(dto);
  }

  async getGroups(): Promise<Fto<Group[]>> {
    const dto: Dto<Group[]> = await this.groupService.getGroups();
    return this.populate<Brand[]>(dto);
  }
}
