import { BaseService, Dto } from '@core/common';
import { DataResult } from '@src/business';
import { DataRepo } from '@src/business/repository';

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
}
