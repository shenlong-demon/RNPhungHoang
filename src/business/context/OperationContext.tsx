import {Booking, Operation, SetOperationEstimationRequest} from '@src/business';
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
};

export const useOperationContextFacade = (): OperationContextResult => {
  const facade: OperationFacade = OperationFacade.shared();
  const [operation, setOperation] = useState<Operation | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
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
  return {
    operation,
    setOperation,
    selectedBooking,
    setSelectedBooking,
    operationActionScreenIndex,
    setOperationActionScreenIndex,
    setEstimation,
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
