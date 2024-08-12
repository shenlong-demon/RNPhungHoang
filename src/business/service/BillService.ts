import { BaseService, Dto } from '@core/common';
import { Bill, BillFilterRequest } from '@src/business';
import { BillRepo } from '@src/business/repository';

export class BillService extends BaseService<BillService> {
  private billRepo: BillRepo = BillRepo.shared();

  constructor() {
    super();
  }

  public static shared(): BillService {
    return this.Instance(BillService);
  }

  async getBillsBy(filter: BillFilterRequest): Promise<Dto<Bill[]>> {
    const dto: Dto<Bill[]> = await this.billRepo.getBillsBy(filter);
    return dto;
  }
}
