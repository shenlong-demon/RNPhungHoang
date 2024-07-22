import {OperationFacade} from '@src/business/facade';
import {CONSTANTS, Dto} from '@core/common';
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
import {File} from '@core/models';

type OperationFacadeResult = {
  openCreateOperationPopup: () => void;
  createOperation: (name?: string) => Promise<Dto<Operation | null>>;
  getOperations: (offset: number) => Promise<Dto<Operation[]>>;
  getOperation: (id: number) => Promise<Dto<Operation | null>>;
  enterOperation: (id: number) => Promise<Dto<Operation | null>>;
  booking: (menuItem: Product) => Promise<void>;
  addIssue: (note: string, image?: File) => Promise<void>;
  assignCustomer: (customer: Customer) => Promise<Dto<Operation | null>>;
  receipt: () => Promise<Dto<Operation | null>>;
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
    if (dto.next()) {
      setOperation(dto.data as Operation);
    }
    return dto;
  };
  const receipt = async (): Promise<Dto<Operation | null>> => {
    if (!operation) {
      return Dto.success(null);
    }
    const dto: Dto<Operation | null> = await facade.receipt(operation);
    if (dto.next()) {
      // removeOperationInList(operation);
      // setOperation(null);
    }
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

  const addIssue = async (note: string, image?: File): Promise<void> => {
    if (operation) {
      const dto: Dto<Operation | null> = await facade.addIssue(
        operation,
        {
          appKey: CONSTANTS.STR_EMPTY,
          note,
        },
        image,
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
    receipt,
    addIssue,
  };
};
