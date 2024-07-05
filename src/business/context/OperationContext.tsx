import {Operation} from '@src/business';
import React, {useContext, useState} from 'react';

export type OperationContextResult = {
  operation: Operation | null;
  setOperation: (op: Operation | null) => void;
  startNewOperation: () => void;
};

export const useOperationContextFacade = (): OperationContextResult => {
  const [operation, setOperation] = useState<Operation | null>(null);
  const startNewOperation = (): void => {};
  return {
    operation,
    setOperation,
    startNewOperation,
  };
};

const DefaultOperationContextResult: OperationContextResult = {
  operation: null,
  setOperation: (_op: Operation | null): void => {},
  startNewOperation: (): void => {},
};

const OperationContext = React.createContext<OperationContextResult>(
  DefaultOperationContextResult,
);

export const useOperationContext = () => useContext(OperationContext);

export const OperationContextProvider = ({children}) => {
  const facade = useOperationContextFacade();
  return (
    <OperationContext.Provider value={facade}>
      {children}
    </OperationContext.Provider>
  );
};
