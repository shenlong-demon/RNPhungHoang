import BaseFacade from '@core/common/models/BaseFacade';
import { Dto, Utility } from '@core/common';
import {
  AddOperationServiceRequest,
  Bill,
  CancelBookingRequest,
  CreateOperationIssueRequest,
  Customer,
  Operation,
  Product,
  RemoveIssueRequest,
  SetBookingNoteRequest,
  SetOperationDiscountRequest,
  SetOperationEstimationRequest,
  UpdateFileService,
} from '@src/business';
import { OperationService } from '@src/business/service/OperationService';
import { File } from '@core/models';

export class OperationFacade extends BaseFacade<OperationFacade> {
  private operationService: OperationService = OperationService.shared();
  private uploadFileService: UpdateFileService = UpdateFileService.shared();
  private static readonly IMAGE_FOLDER: string = 'Operation';

  constructor() {
    super();
  }

  public static shared(): OperationFacade {
    return this.Instance(OperationFacade);
  }

  async createOperation(name?: string): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> =
      await this.operationService.createOperation(name);
    return this.populate(dto);
  }

  async getOperations(offset: number): Promise<Dto<Operation[]>> {
    const dto: Dto<Operation[]> = await this.operationService.getOperations(
      offset,
    );
    return this.populate(dto);
  }

  async getOperation(id: number): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> = await this.operationService.getOperation(
      id,
    );
    return this.populate(dto);
  }

  async booking(
    operation: Operation,
    menuItem: Product,
  ): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> = await this.operationService.booking(
      operation,
      menuItem,
    );
    return this.populate(dto);
  }

  async assignCustomer(
    operation: Operation,
    customer: Customer | null,
  ): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> =
      await this.operationService.assignCustomer(operation, customer);
    return this.populate(dto);
  }

  async receipt(operation: Operation): Promise<Dto<Bill | null>> {
    const dto: Dto<Bill | null> = await this.operationService.receipt(
      operation,
    );
    return this.populate(dto);
  }

  async addIssue(
    operation: Operation,
    req: CreateOperationIssueRequest,
    image?: File,
  ): Promise<Dto<Operation | null>> {
    const appKey: string = Utility.UUID();
    const uploadDto: Dto<string | null> =
      await this.uploadFileService.uploadImage(
        OperationFacade.IMAGE_FOLDER,
        image,
        appKey,
      );
    if (uploadDto.next()) {
      req.appKey = appKey;
      req.image = uploadDto.data as string;
      const dto: Dto<Operation | null> =
        await this.operationService.createIssue(operation, req);
      return dto;
    }
    return uploadDto.bypass();
  }

  async addService(
    operation: Operation,
    req: AddOperationServiceRequest,
  ): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> = await this.operationService.addService(
      operation,
      req,
    );
    return this.populate(dto);
  }

  async cancelBooking(
    operation: Operation,
    req: CancelBookingRequest,
  ): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> =
      await this.operationService.cancelBooking(operation, req);
    return this.populate(dto);
  }

  async setBookingNote(
    operation: Operation,
    req: SetBookingNoteRequest,
  ): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> =
      await this.operationService.setBookingNote(operation, req);
    return this.populate(dto);
  }

  async setOperationDiscount(
    operation: Operation,
    req: SetOperationDiscountRequest,
  ): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> =
      await this.operationService.setOperationDiscount(operation, req);
    return this.populate(dto);
  }

  async setEstimation(
    operation: Operation,
    req: SetOperationEstimationRequest,
  ): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> =
      await this.operationService.setEstimation(operation, req);
    return this.populate(dto);
  }

  async getOperationDetail(
    operationId: number,
  ): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> =
      await this.operationService.getOperationDetail(operationId);
    return this.populate(dto);
  }

  getOperationTotal(operation: Operation | null): number {
    if (!operation) {
      return 0;
    }
    let total: number = 0;
    for (const booking of operation.bookings || []) {
      total += booking.price * booking.quantity;
    }
    total -= operation.discount || 0;
    return total;
  }

  async removeIssue(
    operation: Operation,
    req: RemoveIssueRequest,
  ): Promise<Dto<Operation | null>> {
    const dto: Dto<Operation | null> = await this.operationService.removeIssue(
      operation,
      req,
    );
    return this.populate(dto);
  }
}
