import {
  CreateCustomerRequest,
  Customer,
  UpdateCustomerRequest,
} from '@src/business';
import {File} from '@core/models';

import {Dto} from '@core/common';
import {CustomerFacade} from '@src/business/facade/CustomerFacade';

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

  return {
    updateCustomer,
    createCustomer,
  };
};
