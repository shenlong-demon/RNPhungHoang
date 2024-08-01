import {Operation, useOperationFacade} from '@src/business';
import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {Dto, Logger, ObjectUtils} from '@core/common';

export type OperationListContextResult = {
  operations: Operation[];
  updateOperationInList: (op: Operation) => void;
  removeOperationInList: (op: Operation) => void;
  reloadOperations: () => void;
  loadMoreOperations: () => void;
};

export const useOperationListContextFacade = (): OperationListContextResult => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [operationPageIndex, setOperationPageIndex] = useState<number>(0);
  const previousOperationIndexRef = useRef<number>(-1);
  const facade = useOperationFacade();
  useEffect(() => {
    setOperationPageIndex(operationPageIndex);
  }, []);

  useEffect(() => {
    Logger.log(() => [
      `useOperationListContextFacade loadOperations length ${operations.length} with index ${operationPageIndex}`,
    ]);
    if (previousOperationIndexRef.current != operationPageIndex) {
      loadOperations();
    }
    previousOperationIndexRef.current = operationPageIndex;
  }, [operations.length, operationPageIndex]);

  const reloadOperations = (): void => {
    previousOperationIndexRef.current = -1;
    setOperations([]);
    setOperationPageIndex(0);
  };
  const loadOperations = async (): Promise<void> => {
    const dto: Dto<Operation[]> = await facade.getOperations(
      operationPageIndex,
    );
    Logger.log(() => [
      `useOperationListContextFacade loadOperations ${operationPageIndex}`,
      dto,
    ]);
    if (dto.next()) {
      if (operationPageIndex === 0) {
        setOperations((dto.data || []) as Operation[]);
      } else {
        addOperationInList([...operations, ...(dto.data as Operation[])]);
      }
    }
  };
  const updateOperationInList = (op: Operation): void => {
    addOperationInList([op]);
  };

  const addOperationInList = (ops: Operation[]): void => {
    const newPps: Operation[] = ObjectUtils.distinct(
      [...ops, ...operations],
      (o: Operation) => o.id,
      (o1: Operation, o2: Operation) => {
        return (o2.updatedAt || o2.createdAt) > (o1.updatedAt || o1.createdAt)
          ? 1
          : -1;
      },
    );
    setOperations(newPps);
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
    reloadOperations,
  };
};

const DefaultOperationListContextResult: OperationListContextResult = {
  operations: [],
  updateOperationInList: (_op: Operation | null): void => {},
  removeOperationInList: (_op: Operation | null): void => {},
  loadMoreOperations: async (): Promise<void> => {},
  reloadOperations: (): void => {},
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
