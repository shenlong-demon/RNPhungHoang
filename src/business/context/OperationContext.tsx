import {
  Booking,
  Operation,
  SetOperationEstimationRequest,
  useOperationListContext,
} from '@src/business';
import React, {FC, useContext, useEffect, useState} from 'react';
import {Dto, Logger} from '@core/common';
import {OperationFacade} from '@src/business/facade';

export enum OPERATION_ACTION_SCREEN {
  BOOKING_LIST = 0,
  ISSUE = 1,
  ACTION = 2,
  OPERATION_INFO = 3,
}

export type OperationContextResult = {
  operation: Operation | null;
  setOperation: (op: Operation | null) => void;
  selectedBooking: Booking | null;
  setSelectedBooking: (booking: Booking | null) => void;
  operationActionScreenIndex: number;
  setOperationActionScreenIndex: (index: OPERATION_ACTION_SCREEN) => void;
  setEstimation: (newDate: number) => Promise<void>;
  enterOperation: (op: Operation) => Promise<Dto<Operation | null>>;
  createOperation: (operationName?: string) => Promise<Dto<Operation | null>>;
};

export const useOperationContextFacade = (): OperationContextResult => {
  const facade: OperationFacade = OperationFacade.shared();
  const [operation, setOperation] = useState<Operation | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const {updateOperationInList} = useOperationListContext();
  const [operationActionScreenIndex, setOperationActionScreenIndex] =
    useState<OPERATION_ACTION_SCREEN>(OPERATION_ACTION_SCREEN.BOOKING_LIST);
  useEffect(() => {
    Logger.log(() => [`useOperationContextFacade operation `, operation]);
  }, [operation]);

  const setEstimation = async (newDate: number): Promise<void> => {
    if (!operation) {
      return;
    }
    const dto: Dto<Operation | null> = await facade.setEstimation(operation, {
      newDate: newDate,
    } as SetOperationEstimationRequest);
    if (dto.next()) {
      if (dto.data) {
        setOperation(dto.data as Operation);
      }
    }
  };
  const enterOperation = async (
    op: Operation,
  ): Promise<Dto<Operation | null>> => {
    const dto: Dto<Operation | null> = await facade.getOperation(op.id);
    if (dto.next()) {
      const newOp: Operation | null = dto.data as Operation | null;
      if (newOp) {
        updateOperationInList(newOp);
        setOperation(newOp);
      }
    }
    return dto;
  };
  const createOperation = async (
    operationName?: string,
  ): Promise<Dto<Operation | null>> => {
    const dto: Dto<Operation | null> = await facade.createOperation(
      operationName,
    );
    if (dto.next()) {
      const newOp: Operation | null = dto.data as Operation | null;
      if (newOp) {
        updateOperationInList(newOp);
        setOperation(newOp);
      }
    }
    return dto;
  };

  return {
    operation,
    setOperation,
    selectedBooking,
    setSelectedBooking,
    operationActionScreenIndex,
    setOperationActionScreenIndex,
    setEstimation,
    enterOperation,
    createOperation,
  };
};

const DefaultOperationContextResult: OperationContextResult = {
  operation: null,
  setOperation: (_op: Operation | null): void => {},
  selectedBooking: null,
  setSelectedBooking: (_booking: Booking | null): void => {},
  operationActionScreenIndex: OPERATION_ACTION_SCREEN.BOOKING_LIST,
  setOperationActionScreenIndex: (_index: OPERATION_ACTION_SCREEN): void => {},
  setEstimation: async (_newDate: number): Promise<void> => {},
  enterOperation: async (_op: Operation): Promise<Dto<Operation | null>> => {
    return Dto.default();
  },
  createOperation: async (
    _o_operationName?: string,
  ): Promise<Dto<Operation | null>> => {
    return Dto.default();
  },
};

const OperationContext = React.createContext<OperationContextResult>(
  DefaultOperationContextResult,
);

export const useOperationContext = () => useContext(OperationContext);

type Props = {
  children: React.ReactNode;
};
export const OperationContextProvider: FC<Props> = ({children}) => {
  const facade = useOperationContextFacade();
  return (
    <OperationContext.Provider value={facade}>
      {children}
    </OperationContext.Provider>
  );
};
