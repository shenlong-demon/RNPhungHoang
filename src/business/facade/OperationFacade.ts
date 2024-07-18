import BaseFacade from '@core/common/models/BaseFacade';
import {Dto} from '@core/common';
import {Customer, Operation, Product} from '@src/business';
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
  async getOperation(id: number): Promise<Dto<Operation | null>> {
    return this.operationService.getOperation(id);
  }

  async booking(operation: Operation, menuItem: Product) {
    return this.operationService.booking(operation, menuItem);
  }

  async assignCustomer(
    operation: Operation,
    customer: Customer | null,
  ): Promise<Dto<Operation | null>> {
    return this.operationService.assignCustomer(operation, customer);
  }
}
