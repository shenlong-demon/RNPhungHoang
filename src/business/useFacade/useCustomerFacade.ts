import {
  CreateCustomerRequest,
  Customer,
  CustomerFilterRequest,
  UpdateCustomerRequest,
} from '@src/business';
import { File } from '@core/models';

import { Dto } from '@core/common';
import { CustomerFacade } from '@src/business/facade/CustomerFacade';

type CustomerFacadeResult = {
  updateCustomer: (
    id: number,
    appKey: string,
    req: UpdateCustomerRequest,
    imageFile?: File,
  ) => Promise<Dto<Customer | null>>;
  createCustomer: (
    req: CreateCustomerRequest,
    imageFile?: File,
  ) => Promise<Dto<Customer | null>>;
  searchCustomers: (req: CustomerFilterRequest) => Promise<Customer[]>;
};

export const useCustomerFacade = (): CustomerFacadeResult => {
  const customerFacade: CustomerFacade = CustomerFacade.shared();

  const createCustomer = async (
    req: CreateCustomerRequest,
    imageFile?: File,
  ): Promise<Dto<Customer | null>> => {
    const dto: Dto<Customer | null> = await customerFacade.createCustomer(
      req,
      imageFile,
    );
    return dto;
  };
  const updateCustomer = async (
    id: number,
    appKey: string,
    req: UpdateCustomerRequest,
    imageFile?: File,
  ): Promise<Dto<Customer | null>> => {
    const dto: Dto<Customer | null> = await customerFacade.updateCustomer(
      id,
      appKey,
      req,
      imageFile,
    );
    return dto;
  };

  const searchCustomers = async (
    req: CustomerFilterRequest,
  ): Promise<Customer[]> => {
    const dto: Dto<Customer[]> = await customerFacade.getCustomers(req);
    return (dto.data || []) as Customer[];
  };

  return {
    updateCustomer,
    createCustomer,
    searchCustomers,
  };
};
