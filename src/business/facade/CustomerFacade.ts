import BaseFacade from '@core/common/models/BaseFacade';
import {Dto, Utility} from '@core/common';
import {
  CreateCustomerRequest,
  Customer,
  CustomerFilterRequest,
  CustomerService,
  STATUS,
  UpdateCustomerRequest,
  UpdateFileService,
} from '@src/business';
import {File} from '@core/models';

export class CustomerFacade extends BaseFacade<CustomerFacade> {
  private static readonly IMAGE_FOLDER: string = 'Customer';
  private customerService: CustomerService = CustomerService.shared();
  private uploadFileService: UpdateFileService = UpdateFileService.shared();

  constructor() {
    super();
  }

  public static shared(): CustomerFacade {
    return this.Instance(CustomerFacade);
  }

  async createCustomer(
    req: CreateCustomerRequest,
    imageFile?: File,
  ): Promise<Dto<Customer | null>> {
    const appKey: string = Utility.UUID();
    const uploadDto: Dto<string | null> =
      await this.uploadFileService.uploadImage(
        CustomerFacade.IMAGE_FOLDER,
        imageFile,
        appKey,
      );
    if (uploadDto.next()) {
      req.appKey = appKey;
      req.image = uploadDto.data as string;
      const dto: Dto<Customer | null> =
        await this.customerService.createCustomer(req);
      return dto;
    }
    return uploadDto.bypass();
  }

  async updateCustomer(
    id: number,
    appKey: string,
    req: UpdateCustomerRequest,
    imageFile?: File,
  ): Promise<Dto<Customer | null>> {
    const uploadDto: Dto<string | null> =
      await this.uploadFileService.uploadImage(
        CustomerFacade.IMAGE_FOLDER,
        imageFile,
        appKey,
      );

    if (uploadDto.next()) {
      req.image = uploadDto.data as string;
      const dto: Dto<Customer | null> =
        await this.customerService.updateCustomer(id, req);
      return dto;
    }
    return uploadDto.bypass();
  }

  async getCustomers(req: CustomerFilterRequest): Promise<Dto<Customer[]>> {
    return this.customerService.getCustomers(req);
  }
}
