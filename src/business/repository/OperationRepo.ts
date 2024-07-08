import { ApiResult, BaseRepo, Dto } from "@core/common";
import { API_URL } from "@src/business";

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
}
