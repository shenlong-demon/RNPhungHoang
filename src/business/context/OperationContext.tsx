import {
  AddOperationServiceRequest,
  Bill,
  Booking,
  Issue,
  Operation,
  Product,
  ReceiptRequest,
  RemoveIssueRequest,
  RenameOperationRequest,
  SetOperationEstimationRequest,
  useDtoHandlerContext,
  useOperationListContext,
} from '@src/business';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Dto, Logger } from '@core/common';
import { OperationFacade } from '@src/business/facade';

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
  removeIssue: (issue: Issue) => Promise<void>;
  rename: (newName: string) => Promise<Dto<Operation | null>>;
  deleteOperation: () => Promise<Dto<Operation | null>>;
  enterOperation: (op: Operation) => Promise<Dto<Operation | null>>;
  createOperation: (operationName?: string) => Promise<Dto<Operation | null>>;
  getOperationDetail: () => Promise<Dto<Operation | null>>;
  receipt: (req: ReceiptRequest) => Promise<Dto<Bill | null>>;
  total: number;
  booking: (menuItem: Product) => Promise<void>;
  addService: (
    name: string,
    price: number,
    note?: string,
  ) => Promise<Dto<Operation | null>>;
};

export const useOperationContextFacade = (): OperationContextResult => {
  const { dtoHandle } = useDtoHandlerContext();
  const facade: OperationFacade = OperationFacade.shared();
  const [operation, setOperation] = useState<Operation | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { updateOperationInList, removeOperationInList } =
    useOperationListContext();
  const [operationActionScreenIndex, setOperationActionScreenIndex] =
    useState<OPERATION_ACTION_SCREEN>(OPERATION_ACTION_SCREEN.BOOKING_LIST);
  useEffect(() => {
    Logger.log(() => [`useOperationContextFacade operation `, operation]);
  }, [operation]);

  const total = useMemo(() => {
    if (!operation) {
      return 0;
    }
    return facade.getOperationTotal(operation);
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
        updateOperationInList(dto.data);
        setOperation(dto.data as Operation);
      }
    }
  };
  const removeIssue = async (issue: Issue): Promise<void> => {
    if (!operation) {
      return;
    }
    const dto: Dto<Operation | null> = await facade.removeIssue(operation, {
      issueId: issue.id,
    } as RemoveIssueRequest);
    if (dto.next()) {
      if (dto.data) {
        updateOperationInList(dto.data);
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
        setOperationActionScreenIndex(OPERATION_ACTION_SCREEN.BOOKING_LIST);
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

  const getOperationDetail = async (): Promise<Dto<Operation | null>> => {
    if (!operation) {
      return Dto.default();
    }
    const dto: Dto<Operation | null> = await facade.getOperationDetail(
      operation.id,
    );
    if (dto.next()) {
      const fullOp: Operation | null = dto.data as Operation | null;
      if (!!fullOp) {
        updateOperationInList(fullOp);
        setOperation(fullOp);
      }
    }
    return dto;
  };

  const receipt = async (req: ReceiptRequest): Promise<Dto<Bill | null>> => {
    if (!operation) {
      return Dto.default();
    }
    const dto: Dto<Bill | null> = await facade.receipt(operation, req);
    if (dto.next()) {
      removeOperationInList(operation);
      setOperation(null);
    }
    return dto;
  };
  const rename = async (newName: string): Promise<Dto<Operation | null>> => {
    if (!operation) {
      return Dto.default();
    }
    const dto: Dto<Operation | null> = await facade.rename(operation, {
      name: newName,
    } as RenameOperationRequest);
    if (dto.next() && dto.data) {
      const newOp: Operation = dto.data as Operation;
      updateOperationInList(newOp);
      setOperation(newOp);
    }
    return dto;
  };
  const deleteOperation = async (): Promise<Dto<Operation | null>> => {
    if (!operation) {
      return Dto.default();
    }
    const dto: Dto<null> = await facade.deleteOperation(operation);
    if (dto.next()) {
      removeOperationInList(operation);
      setOperation(null);
    }
    return dto;
  };
  const booking = async (menuItem: Product): Promise<void> => {
    if (operation) {
      const dto: Dto<Operation | null> = await facade.booking(
        operation,
        menuItem,
      );
      if (dto.next() && dto.data) {
        const fullOp: Operation = dto.data as Operation;
        updateOperationInList(fullOp);
        setOperation(fullOp);
      }
    }
  };

  const addService = async (
    name: string,
    price: number,
    note?: string,
  ): Promise<Dto<Operation | null>> => {
    if (operation) {
      const dto: Dto<Operation | null> = await facade.addService(operation, {
        name,
        price,
        note,
      } as AddOperationServiceRequest);
      if (dto.next()) {
        setOperation(dto.data as Operation);
      }
      return dto;
    }
    return Dto.default();
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
    getOperationDetail,
    receipt,
    total,
    removeIssue,
    booking,
    addService,
    rename,
    deleteOperation,
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
    _operationName?: string,
  ): Promise<Dto<Operation | null>> => {
    return Dto.default();
  },
  getOperationDetail: async (): Promise<Dto<Operation | null>> => {
    return Dto.default();
  },
  receipt: async (_req: ReceiptRequest): Promise<Dto<Bill | null>> => {
    return Dto.default();
  },
  total: 0,
  removeIssue: async (_issue: Issue): Promise<void> => {},
  booking: async (_menuItem: Product): Promise<void> => {},
  addService: async (
    _name: string,
    _price: number,
    _note?: string,
  ): Promise<Dto<Operation | null>> => {
    return Dto.default();
  },
  rename: async (_name: string): Promise<Dto<Operation | null>> => {
    return Dto.default();
  },
  deleteOperation: async (): Promise<Dto<Operation | null>> => {
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
export const OperationContextProvider: FC<Props> = ({ children }) => {
  const facade = useOperationContextFacade();
  return (
    <OperationContext.Provider value={facade}>
      {children}
    </OperationContext.Provider>
  );
};
