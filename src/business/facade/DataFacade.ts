import BaseFacade from '@core/common/models/BaseFacade';
import {Dto} from '@core/common';
import {
  Brand,
  BrandService,
  DataResult,
  DataService,
  Group,
} from '@src/business';
import {GroupService} from '@src/business/service/GroupService';

export class DataFacade extends BaseFacade<DataFacade> {
  private brandService: BrandService = BrandService.shared();
  private groupService: GroupService = GroupService.shared();
  private dataService: DataService = DataService.shared();

  constructor() {
    super();
  }

  public static shared(): DataFacade {
    return this.Instance(DataFacade);
  }

  async getBrands(): Promise<Dto<Brand[]>> {
    const dto: Dto<Brand[]> = await this.brandService.getBrands();
    return dto;
  }

  async getGroups(): Promise<Dto<Group[]>> {
    const dto: Dto<Group[]> = await this.groupService.getGroups();
    return dto;
  }
  async getAllData(): Promise<Dto<DataResult | null>> {
    return this.dataService.getAll();
  }
}
