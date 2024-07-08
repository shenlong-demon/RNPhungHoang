import {BaseService, Dto} from '@core/common';
import {Operation} from '@src/business';
import {OperationRepo} from '@src/business/repository';

export class OperationService extends BaseService<OperationService> {
  private operationRepo: OperationRepo = OperationRepo.shared();

  constructor() {
    super();
  }

  public static shared(): OperationService {
    return this.Instance(OperationService);
  }

  async createOperation(name?: string): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> = await this.operationRepo.createOperation(
      name,
    );
    return dto;
  }

  async getOperations(offset: number): Promise<Dto<Operation[]>> {
    return this.operationRepo.getOperations(offset);
  }
}
