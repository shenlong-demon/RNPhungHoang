import {ApiResult, BaseRepo, Dto} from '@core/common';
import {
  API_URL,
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from '@src/business';

export class CustomerRepo extends BaseRepo<CustomerRepo> {
  constructor() {
    super();
  }

  public static shared(): CustomerRepo {
    return this.Instance(CustomerRepo);
  }

  async createCustomer(req: CreateCustomerRequest): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.post(API_URL.CREATE_CUSTOMER(), req);
    return this.populate(api);
  }

  async updateCustomer(
    id: number,
    req: UpdateCustomerRequest,
  ): Promise<Dto<any | null>> {
    const api: ApiResult = await this.api.put(API_URL.UPDATE_CUSTOMER(id), req);
    return this.populate(api);
  }
}
