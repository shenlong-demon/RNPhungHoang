import BaseFacade from '@core/common/models/BaseFacade';
import { Dto } from '@core/common';
import { Bill, BillFilterRequest, BillService } from '@src/business';

export class BillFacade extends BaseFacade<BillFacade> {
  private billService: BillService = BillService.shared();

  constructor() {
    super();
  }

  public static shared(): BillFacade {
    return this.Instance(BillFacade);
  }

  async getBillsBy(filter: BillFilterRequest): Promise<Dto<Bill[]>> {
    const dto: Dto<Bill[]> = await this.billService.getBillsBy(filter);
    return this.populate(dto);
  }
}
