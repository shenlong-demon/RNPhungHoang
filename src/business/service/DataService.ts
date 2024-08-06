import {BaseService, Dto} from '@core/common';
import {
  Brand,
  CreateBrandRequest,
  CreateGroupRequest,
  DataResult,
  Group,
  UpdateBrandRequest,
  UpdateGroupRequest,
} from '@src/business';
import {DataRepo} from '@src/business/repository';

export class DataService extends BaseService<DataService> {
  private dataRepo: DataRepo = DataRepo.shared();

  constructor() {
    super();
  }

  public static shared(): DataService {
    return this.Instance(DataService);
  }

  async getAll(): Promise<Dto<DataResult | null>> {
    const dto: Dto<DataResult | null> = await this.dataRepo.getAll();
    return dto;
  }

  async createBrand(req: CreateBrandRequest): Promise<Dto<Brand | null>> {
    return this.dataRepo.createBrand(req);
  }
  async updateBrand(
    brandId: number,
    req: UpdateBrandRequest,
  ): Promise<Dto<Brand | null>> {
    return this.dataRepo.updateBrand(brandId, req);
  }
  async createGroup(req: CreateGroupRequest): Promise<Dto<Group | null>> {
    return this.dataRepo.createGroup(req);
  }
  async updateGroup(
    groupId: number,
    req: UpdateGroupRequest,
  ): Promise<Dto<Group | null>> {
    return this.dataRepo.updateGroup(groupId, req);
  }
}
