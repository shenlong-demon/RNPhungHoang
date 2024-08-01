import {BaseService, Dto} from '@core/common';
import {
  AddOperationServiceRequest,
  CancelBookingRequest,
  CreateOperationIssueRequest,
  Customer,
  Operation,
  Product,
  SetOperationDiscountRequest,
  SetOperationEstimationRequest,
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

  createIssue = async (
    operation: Operation,
    req: CreateOperationIssueRequest,
  ): Promise<Dto<Operation | null>> =>
    this.operationRepo.createIssue(operation.id, req);

  async addService(
    operation: Operation,
    req: AddOperationServiceRequest,
  ): Promise<Dto<Operation | null>> {
    return this.operationRepo.addService(operation.id, req);
  }

  async cancelBooking(
    operation: Operation,
    req: CancelBookingRequest,
  ): Promise<Dto<Operation | null>> {
    return this.operationRepo.cancelBooking(operation.id, req);
  }

  async setBookingNote(
    operation: Operation,
    req: CancelBookingRequest,
  ): Promise<Dto<Operation | null>> {
    return this.operationRepo.setBookingNote(operation.id, req);
  }

  async setOperationDiscount(
    operation: Operation,
    req: SetOperationDiscountRequest,
  ): Promise<Dto<Operation | null>> {
    return this.operationRepo.setOperationDiscount(operation.id, req);
  }

  async setEstimation(
    operation: Operation,
    req: SetOperationEstimationRequest,
  ): Promise<Dto<Operation | null>> {
    return this.operationRepo.setEstimation(operation.id, req);
  }

  async getOperationDetail(
    operationId: number,
  ): Promise<Dto<Operation | null>> {
    return this.operationRepo.getOperationDetail(operationId);
  }
}
