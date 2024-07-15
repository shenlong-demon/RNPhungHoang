import {Operation, useOperationFacade} from '@src/business';
import React, {FC, useContext, useEffect, useState} from 'react';
import {Dto, Logger} from '@core/common';

export type OperationListContextResult = {
  operations: Operation[];
  updateOperationInList: (op: Operation) => void;
  removeOperationInList: (op: Operation) => void;

  loadMoreOperations: () => void;
};

export const useOperationListContextFacade = (): OperationListContextResult => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [operationPageIndex, setOperationPageIndex] = useState<number>(0);
  const facade = useOperationFacade();
  useEffect(() => {
    setOperationPageIndex(0);
  }, []);

  useEffect(() => {
    loadOperations();
  }, [operationPageIndex]);

  const loadOperations = async (): Promise<void> => {
    Logger.log(() => [
      `useOperationListContextFacade loadOperations ${operationPageIndex}`,
    ]);
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
    const exclude: Operation[] = operations.filter((o: Operation): boolean => {
      return o.id != op.id;
    });
    exclude.push(op);
    setOperations([...exclude]);
  };

  const loadMoreOperations = (): void => {
    setOperationPageIndex(operationPageIndex + 1);
  };
  const removeOperationInList = (op: Operation): void => {
    setOperations([
      ...operations.filter((o: Operation): boolean => {
        return o.id !== op.id;
      }),
    ]);
  };
  return {
    operations,
    updateOperationInList,
    removeOperationInList,
    loadMoreOperations,
  };
};

const DefaultOperationListContextResult: OperationListContextResult = {
  operations: [],
  updateOperationInList: (_op: Operation | null): void => {},
  removeOperationInList: (_op: Operation | null): void => {},
  loadMoreOperations: async (): Promise<void> => {},
};

const OperationListContext = React.createContext<OperationListContextResult>(
  DefaultOperationListContextResult,
);

export const useOperationListContext = () => useContext(OperationListContext);

type Props = {
  children: React.ReactNode;
};
export const OperationListContextProvider: FC<Props> = ({children}) => {
  const facade = useOperationListContextFacade();
  return (
    <OperationListContext.Provider value={facade}>
      {children}
    </OperationListContext.Provider>
  );
};
