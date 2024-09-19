import BaseFacade from '@core/common/models/BaseFacade';
import { Dto } from '@core/common';
import { CacheService, DataResult, DataService } from '@src/business';

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
    return Dto.success({} as DataResult);
  }
}
