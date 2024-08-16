import BaseFacade from '@core/common/models/BaseFacade';
import { Dto, Logger } from '@core/common';
import {
  Brand,
  CacheService,
  CreateBrandRequest,
  CreateGroupRequest,
  DataResult,
  DataService,
  Group,
  UpdateBrandRequest,
  UpdateGroupRequest,
} from '@src/business';

export class DataFacade extends BaseFacade<DataFacade> {
  private dataService: DataService = DataService.shared();
  private cacheService: CacheService = CacheService.shared();

  constructor() {
    super();
  }

  public static shared(): DataFacade {
    return this.Instance(DataFacade);
  }

  async getAllData(forceGetNew?: boolean): Promise<Dto<DataResult | null>> {
    if (!forceGetNew) {
      const brands: Brand[] = await this.cacheService.getBrands();
      const groups: Group[] = await this.cacheService.getGroups();
      Logger.log(() => [`DataFacade getAllData from CACHE `, brands, groups]);
      if (brands.length > 0 && groups.length > 0) {
        return Dto.success({ groups, brands } as DataResult);
      }
    }
    const dto: Dto<DataResult | null> = await this.dataService.getAll();
    if (dto.next() && dto.data) {
      const data: DataResult = dto.data as DataResult;
      await this.cacheService.saveBrands(data.brands);
      await this.cacheService.saveGroups(data.groups);
    }
    return this.populate(dto);
  }

  async createBrand(req: CreateBrandRequest): Promise<Dto<Brand | null>> {
    const dto: Dto<Brand | null> = await this.dataService.createBrand(req);
    if (dto.next() && dto.data) {
      const newBrand: Brand = dto.data as Brand;
      await this.cacheService.saveBrand(newBrand);
    }
    return this.populate(dto);
  }

  async updateBrand(
    brandId: number,
    req: UpdateBrandRequest,
  ): Promise<Dto<Brand | null>> {
    const dto: Dto<Brand | null> = await this.dataService.updateBrand(
      brandId,
      req,
    );
    if (dto.next() && dto.data) {
      const newBrand: Brand = dto.data as Brand;
      await this.cacheService.saveBrand(newBrand);
    }
    return this.populate(dto);
  }

  async createGroup(req: CreateGroupRequest): Promise<Dto<Group | null>> {
    const dto: Dto<Group | null> = await this.dataService.createGroup(req);
    if (dto.next() && dto.data) {
      const newGroup: Group = dto.data as Group;
      await this.cacheService.saveGroup(newGroup);
    }
    return this.populate(dto);
  }

  async updateGroup(
    groupId: number,
    req: UpdateGroupRequest,
  ): Promise<Dto<Group | null>> {
    const dto: Dto<Group | null> = await this.dataService.updateGroup(
      groupId,
      req,
    );
    if (dto.next() && dto.data) {
      const newGroup: Group = dto.data as Group;
      await this.cacheService.saveGroup(newGroup);
    }
    return this.populate(dto);
  }
}
