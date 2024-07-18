import {OperationFacade} from '@src/business/facade';
import {Dto} from '@core/common';
import {
  Customer,
  Operation,
  Product,
  useOperationContext,
  useOperationListContext,
  usePopupContext,
} from '@src/business';
import React from 'react';
import {Route} from '@src/screens/portrait/Route';
import {useNavigation} from '@core/navigation';
import {CreateOperationPopup} from '@src/screens/portrait/components/popup';

type OperationFacadeResult = {
  openCreateOperationPopup: () => void;
  createOperation: (name?: string) => Promise<Dto<Operation | null>>;
  getOperations: (offset: number) => Promise<Dto<Operation[]>>;
  getOperation: (id: number) => Promise<Dto<Operation | null>>;
  enterOperation: (id: number) => Promise<Dto<Operation | null>>;
  booking: (menuItem: Product) => Promise<void>;
  assignCustomer: (customer: Customer) => Promise<Dto<Operation | null>>;
};
const CREATE_POPUP_ID: string = 'CREATE_POPUP_ID';

export const useOperationFacade = (): OperationFacadeResult => {
  const facade: OperationFacade = OperationFacade.shared();
  const {openPopup, closeAllPopups} = usePopupContext();
  const {navigate} = useNavigation();
  const {setOperation, operation} = useOperationContext();
  const {updateOperationInList} = useOperationListContext();

  const getOperations = async (offset: number): Promise<Dto<Operation[]>> => {
    return facade.getOperations(offset);
  };
  const getOperation = async (id: number): Promise<Dto<Operation | null>> => {
    return facade.getOperation(id);
  };

  const gotoOperation = (op: Operation): void => {
    setOperation(op);
    updateOperationInList(op);
    navigate(Route.OPERATION_DETAIL, op);
  };

  const enterOperation = async (id: number): Promise<Dto<Operation | null>> => {
    const dto: Dto<Operation | null> = await getOperation(id);
    if (dto.next()) {
      const op: Operation = dto.data as Operation;
      gotoOperation(op);
      closeAllPopups();
    }
    return dto;
  };

  const assignCustomer = async (
    customer: Customer,
  ): Promise<Dto<Operation | null>> => {
    if (!operation) {
      return Dto.success(null);
    }
    const dto: Dto<Operation | null> = await facade.assignCustomer(
      operation,
      customer,
    );
    return dto;
  };
  const openCreateOperationPopup = (): void => {
    openPopup(
      CREATE_POPUP_ID,
      <CreateOperationPopup
        onCancel={closeAllPopups}
        onOk={async (op: Operation): Promise<void> => {
          gotoOperation(op);
          closeAllPopups();
        }}
      />,
    );
  };

  const createOperation = async (
    name?: string,
  ): Promise<Dto<Operation | null>> => {
    return facade.createOperation(name);
  };

  const booking = async (menuItem: Product): Promise<void> => {
    if (operation) {
      const dto: Dto<Operation | null> = await facade.booking(
        operation,
        menuItem,
      );
      if (dto.next()) {
        setOperation(dto.data as Operation);
      }
    }
  };

  return {
    openCreateOperationPopup,
    createOperation,
    getOperations,
    getOperation,
    enterOperation,
    booking,
    assignCustomer,
  };
};
