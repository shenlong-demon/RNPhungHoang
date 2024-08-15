import {
  Operation,
  useDtoHandlerContext,
  useOperationFacade,
} from '@src/business';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Dto, Logger, ObjectUtils } from '@core/common';

export type OperationListContextResult = {
  operations: Operation[];
  updateOperationInList: (op: Operation) => void;
  removeOperationInList: (op: Operation) => void;
  reloadOperations: () => void;
  loadMoreOperations: () => void;
};

export const useOperationListContextFacade = (): OperationListContextResult => {
  const { dtoHandle } = useDtoHandlerContext();
  const [operations, setOperations] = useState<Operation[]>([]);
  const pageIndexRef = useRef<number>(0);
  const facade = useOperationFacade();
  useEffect(() => {
    pageIndexRef.current = 0;
    loadOperations();
  }, []);
  const reloadOperations = (): void => {
    pageIndexRef.current = 0;
    loadOperations();
  };
  const loadOperations = async (): Promise<void> => {
    const dto: Dto<Operation[]> = await facade.getOperations(
      pageIndexRef.current,
    );
    Logger.log(() => [
      `useOperationListContextFacade loadOperations ${pageIndexRef.current}`,
      dto,
    ]);
    const isSuccess: boolean = await dtoHandle(dto);
    if (isSuccess) {
      const newOps: Operation[] = (dto.data || []) as Operation[];
      if (pageIndexRef.current === 0) {
        setOperations((dto.data || []) as Operation[]);
      } else {
        if (newOps.length === 0) {
          pageIndexRef.current -= 1;
        }
        addOperationInList([...operations, ...newOps]);
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
    pageIndexRef.current += 1;
    loadOperations();
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
export const OperationListContextProvider: FC<Props> = ({ children }) => {
  const facade = useOperationListContextFacade();
  return (
    <OperationListContext.Provider value={facade}>
      {children}
    </OperationListContext.Provider>
  );
};
