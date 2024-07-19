import {Booking, Operation} from '@src/business';
import React, {FC, useContext, useEffect, useState} from 'react';
import {Logger} from '@core/common';

export type OperationContextResult = {
  operation: Operation | null;
  setOperation: (op: Operation | null) => void;
  selectedBooking: Booking | null;
  setSelectedBooking: (booking: Booking | null) => void;
};

export const useOperationContextFacade = (): OperationContextResult => {
  const [operation, setOperation] = useState<Operation | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  useEffect(() => {
    Logger.log(() => [`useOperationContextFacade operation `, operation]);
  }, [operation]);
  return {
    operation,
    setOperation,
    selectedBooking,
    setSelectedBooking,
  };
};

const DefaultOperationContextResult: OperationContextResult = {
  operation: null,
  setOperation: (_op: Operation | null): void => {},
  selectedBooking: null,
  setSelectedBooking: (_booking: Booking | null): void => {},
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
