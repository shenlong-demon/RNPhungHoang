import {DataFacade, OperationFacade} from '@src/business/facade';
import {Dto} from '@core/common';
import {Brand, Group, Operation} from '@src/business';

type OperationFacadeResult = {
  createOperation: (name?: string) => Promise<Dto<Operation | null>>;
  getOperations: (offset: number) => Promise<Dto<Operation[]>>;
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

  return {createOperation, getOperations};
};
