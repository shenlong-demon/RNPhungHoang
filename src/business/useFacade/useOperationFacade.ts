import {DataFacade, OperationFacade} from '@src/business/facade';
import {Dto} from '@core/common';
import {Brand, Group, Operation} from '@src/business';

type OperationFacadeResult = {
  createOperation: (name?: string) => Promise<Dto<Operation | null>>;
  getOperations: (offset: number) => Promise<Dto<Operation[]>>;
  getOperation: (id: number) => Promise<Dto<Operation | null>>;
};

export const useOperationFacade = (): OperationFacadeResult => {
  const facade: OperationFacade = OperationFacade.shared();
  const createOperation = async (
    name?: string,
  ): Promise<Dto<Operation | null>> => {
    return facade.createOperation(name);
  };
  const getOperations = async (offset: number): Promise<Dto<Operation[]>> => {
    return facade.getOperations(offset);
  };
  const getOperation = async (id: number): Promise<Dto<Operation | null>> => {
    return facade.getOperation(id);
  };

  return {createOperation, getOperations, getOperation};
};
