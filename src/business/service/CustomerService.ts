import {BaseService, Dto} from '@core/common';
import {
  CreateCustomerRequest,
  Customer,
  UpdateCustomerRequest,
} from '@src/business';
import {CustomerRepo} from '@src/business/repository';

export class CustomerService extends BaseService<CustomerService> {
  private customerRepo: CustomerRepo = CustomerRepo.shared();

  constructor() {
    super();
  }

  public static shared(): CustomerService {
    return this.Instance(CustomerService);
  }

  async createCustomer(
    req: CreateCustomerRequest,
  ): Promise<Dto<Customer | null>> {
    const dto: Dto<Customer | null> = await this.customerRepo.createCustomer(req);
    return dto;
  }

  async updateCustomer(
    id: number,
    req: UpdateCustomerRequest,
  ): Promise<Dto<Customer | null>> {
    const dto: Dto<Customer | null> = await this.customerRepo.updateCustomer(
      id,
      req,
    );
    return dto;
  }
}
