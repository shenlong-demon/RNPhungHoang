import {Operation} from '@src/business';
import React, {FC, useContext, useState} from 'react';

export type OperationContextResult = {
  operation: Operation | null;
  setOperation: (op: Operation | null) => void;
};

export const useOperationContextFacade = (): OperationContextResult => {
  const [operation, setOperation] = useState<Operation | null>(null);

  return {
    operation,
    setOperation,
  };
};

const DefaultOperationContextResult: OperationContextResult = {
  operation: null,
  setOperation: (_op: Operation | null): void => {},
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
