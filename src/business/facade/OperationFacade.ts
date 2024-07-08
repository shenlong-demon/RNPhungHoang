import BaseFacade from '@core/common/models/BaseFacade';
import {Dto} from '@core/common';
import {Operation} from '@src/business';
import {OperationService} from '@src/business/service/OperationService';

export class OperationFacade extends BaseFacade<OperationFacade> {
  private operationService: OperationService = OperationService.shared();

  constructor() {
    super();
  }

  public static shared(): OperationFacade {
    return this.Instance(OperationFacade);
  }

  async createOperation(name?: string): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> =
      await this.operationService.createOperation(name);
    return dto;
  }

  async getOperations(offset: number): Promise<Dto<Operation[]>> {
    return this.operationService.getOperations(offset);
  }
}
