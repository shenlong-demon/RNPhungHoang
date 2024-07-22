import {BaseService, Dto} from '@core/common';
import {
  CreateOperationIssueRequest,
  Customer,
  Operation,
  Product,
} from '@src/business';
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
  async getOperation(id: number): Promise<Dto<Operation | null>> {
    return this.operationRepo.getOperation(id);
  }

  async booking(
    operation: Operation,
    menuItem: Product,
  ): Promise<Dto<Operation | null>> {
    return this.operationRepo.booking(operation.id, menuItem.id);
  }

  async assignCustomer(operation: Operation, customer: Customer | null) {
    return this.operationRepo.assignCustomer(
      operation.id,
      customer?.id || null,
    );
  }

  async receipt(operation: Operation): Promise<Dto<Operation | null>> {
    return this.operationRepo.receipt(operation.id);
  }

  async createIssue(
    operation: Operation,
    req: CreateOperationIssueRequest,
  ): Promise<Dto<Operation | null>> {
    return this.operationRepo.createIssue(operation.id, req);
  }
}