import BaseFacade from '@core/common/models/BaseFacade';
import {Dto, Utility} from '@core/common';
import {
  CreateOperationIssueRequest,
  Customer,
  Operation,
  Product,
  UpdateFileService,
} from '@src/business';
import {OperationService} from '@src/business/service/OperationService';
import {File} from '@core/models';

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

  async receipt(operation: Operation): Promise<Dto<Operation | null>> {
    return this.operationService.receipt(operation);
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
}
