import {Operation, useOperationFacade} from '@src/business';
import React, {useContext, useEffect, useState} from 'react';
import {Dto} from '@core/common';

export type OperationContextResult = {
  operation: Operation | null;
  operations: Operation[];
  setOperation: (op: Operation | null) => void;
  updateOperationInList: (op: Operation) => void;
  removeOperationInList: (op: Operation) => void;

  loadOperations: () => Promise<void>;
};

export const useOperationContextFacade = (): OperationContextResult => {
  const [operation, setOperation] = useState<Operation | null>(null);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [operationPageIndex, setOperationPageIndex] = useState<number>(0);
  const facade = useOperationFacade();
  useEffect(() => {
    loadOperations();
  }, []);

  const loadOperations = async (): Promise<void> => {
    const dto: Dto<Operation[]> = await facade.getOperations(
      operationPageIndex,
    );
    if (dto.next()) {
      if (operationPageIndex === 0) {
        setOperations(dto.data as Operation[]);
      } else {
        setOperations([...operations, ...(dto.data as Operation[])]);
      }
    }
  };
  const updateOperationInList = (op: Operation): void => {
    setOperations([
      op,
      ...operations.filter((o: Operation): boolean => {
        return o.id !== op.id;
      }),
    ]);
  };
  const removeOperationInList = (op: Operation): void => {
    setOperations([
      ...operations.filter((o: Operation): boolean => {
        return o.id !== op.id;
      }),
    ]);
  };
  return {
    operation,
    setOperation,
    operations,
    updateOperationInList,
    removeOperationInList,
    loadOperations,
  };
};

const DefaultOperationContextResult: OperationContextResult = {
  operation: null,
  operations: [],
  setOperation: (_op: Operation | null): void => {},
  updateOperationInList: (_op: Operation | null): void => {},
  removeOperationInList: (_op: Operation | null): void => {},
  loadOperations: async (): Promise<void> => {},
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
