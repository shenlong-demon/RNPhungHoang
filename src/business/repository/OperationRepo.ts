import { ApiResult, BaseRepo, Dto } from '@core/common';
import {
  AddOperationServiceRequest,
  API_URL,
  CancelBookingRequest,
  CreateOperationIssueRequest,
  ReceiptRequest,
  RemoveIssueRequest,
  RenameOperationRequest,
  SetOperationDiscountRequest,
  SetOperationEstimationRequest,
} from '@src/business';

export class OperationRepo extends BaseRepo<OperationRepo> {
  constructor() {
    super();
  }

  public static shared(): OperationRepo {
    return this.Instance(OperationRepo);
  }

  public async createOperation(name?: string): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.post(API_URL.CREATE_OPERATION(), {
      name,
    });
    return this.populate(api);
  }

  public async getOperations(offset: number): Promise<Dto<any[]>> {
    const api: ApiResult = await this.api.get(API_URL.GET_OPERATIONS(offset));
    return this.populate(api);
  }

  public async getOperation(id: number): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.get(API_URL.GET_OPERATION(id));
    return this.populate(api);
  }

  async booking(
    operationId: number,
    productId: number,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(API_URL.BOOKING(operationId), {
      productId,
    });
    return this.populate(api);
  }

  async assignCustomer(
    operationId: number,
    customerId: number | null,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.ASSIGN_CUSTOMER(operationId),
      {
        customerId,
      },
    );
    return this.populate(api);
  }

  async receipt(
    operationId: number,
    req: ReceiptRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.RECEIPT(operationId),
      req,
    );
    return this.populate(api);
  }

  async createIssue(
    operationId: number,
    req: CreateOperationIssueRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.CREATE_ISSUE(operationId),
      req,
    );
    return this.populate(api);
  }

  async addService(
    operationId: number,
    req: AddOperationServiceRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.ADD_SERVICE(operationId),
      req,
    );
    return this.populate(api);
  }

  async cancelBooking(
    operationId: number,
    req: CancelBookingRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.CANCEL_BOOKING(operationId),
      req,
    );
    return this.populate(api);
  }

  async setBookingNote(
    operationId: number,
    req: CancelBookingRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.SET_BOOKING_NOTE(operationId),
      req,
    );
    return this.populate(api);
  }

  async setOperationDiscount(
    operationId: number,
    req: SetOperationDiscountRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.SET_OPERATION_DISCOUNT(operationId),
      req,
    );
    return this.populate(api);
  }

  async setEstimation(
    operationId: number,
    req: SetOperationEstimationRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.SET_OPERATION_ESTIMATION(operationId),
      req,
    );
    return this.populate(api);
  }

  async getOperationDetail(operationId: number): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.get(
      API_URL.GET_OPERATION_DETAIL(operationId),
    );
    return this.populate(api);
  }

  async removeIssue(
    operationId: number,
    req: RemoveIssueRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.REMOVE_ISSUE(operationId),
      req,
    );
    return this.populate(api);
  }

  async renameOperation(
    operationId: number,
    req: RenameOperationRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(
      API_URL.RENAME_OPERATION(operationId),
      req,
    );
    return this.populate(api);
  }

  async deleteOperation(operationId: number): Promise<Dto<null>> {
    const api: ApiResult = await this.api.delete(
      API_URL.DELETE_OPERATION(operationId),
    );
    return this.populate(api);
  }
}
