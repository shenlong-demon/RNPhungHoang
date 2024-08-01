import {OperationFacade} from '@src/business/facade';
import {CONSTANTS, Dto} from '@core/common';
import {
  Customer,
  Operation,
  Product,
  useOperationContext,
  useOperationListContext,
  usePopupContext,
} from '@src/business';
import {Route} from '@src/screens/portrait/Route';
import {useNavigation} from '@core/navigation';
import {File} from '@core/models';

type OperationFacadeResult = {
  createOperation: (name?: string) => Promise<Dto<Operation | null>>;
  getOperations: (offset: number) => Promise<Dto<Operation[]>>;
  getOperation: (id: number) => Promise<Dto<Operation | null>>;
  enterOperation: (id: number) => Promise<Dto<Operation | null>>;
  booking: (menuItem: Product) => Promise<void>;
  addIssue: (note: string, image?: File) => Promise<void>;
  addService: (
    name: string,
    price: number,
    note: string,
  ) => Promise<Dto<Operation | null>>;
  assignCustomer: (customer: Customer | null) => Promise<Dto<Operation | null>>;
  cancelBooking: () => Promise<Dto<Operation | null>>;
  setBookingNote: (newNote: string) => Promise<Dto<Operation | null>>;
  setOperationDiscount: (discount: number) => Promise<Dto<Operation | null>>;
};

export const useOperationFacade = (): OperationFacadeResult => {
  const facade: OperationFacade = OperationFacade.shared();
  const {openPopup, closeAllPopups} = usePopupContext();
  const {navigate} = useNavigation();
  const {setOperation, operation, selectedBooking, setSelectedBooking} =
    useOperationContext();
  const {updateOperationInList} = useOperationListContext();

  const getOperations = async (offset: number): Promise<Dto<Operation[]>> => {
    return facade.getOperations(offset);
  };
  const getOperation = async (id: number): Promise<Dto<Operation | null>> => {
    return facade.getOperation(id);
  };

  const gotoOperation = (op: Operation): void => {
    setOperation(op);
    updateOperationInList(op);
    navigate(Route.OPERATION_DETAIL, op);
  };

  const enterOperation = async (id: number): Promise<Dto<Operation | null>> => {
    const dto: Dto<Operation | null> = await getOperation(id);
    if (dto.next()) {
      const op: Operation = dto.data as Operation;
      gotoOperation(op);
      closeAllPopups();
    }
    return dto;
  };

  const assignCustomer = async (
    customer: Customer | null,
  ): Promise<Dto<Operation | null>> => {
    if (!operation) {
      return Dto.success(null);
    }
    const dto: Dto<Operation | null> = await facade.assignCustomer(
      operation,
      customer,
    );
    if (dto.next()) {
      setOperation(dto.data as Operation);
    }
    return dto;
  };


  const createOperation = async (
    name?: string,
  ): Promise<Dto<Operation | null>> => {
    const dto: Dto<Operation | null> = await facade.createOperation(name);
    if (dto.next()) {
      gotoOperation(dto.data as Operation);
      closeAllPopups();
    }
    return dto;
  };

  const booking = async (menuItem: Product): Promise<void> => {
    if (operation) {
      const dto: Dto<Operation | null> = await facade.booking(
        operation,
        menuItem,
      );
      if (dto.next()) {
        setOperation(dto.data as Operation);
      }
    }
  };

  const addIssue = async (note: string, image?: File): Promise<void> => {
    if (operation) {
      const dto: Dto<Operation | null> = await facade.addIssue(
        operation,
        {
          appKey: CONSTANTS.STR_EMPTY,
          note,
        },
        image,
      );
      if (dto.next()) {
        setOperation(dto.data as Operation);
      }
    }
  };
  const addService = async (
    name: string,
    price: number,
    note: string,
  ): Promise<Dto<Operation | null>> => {
    if (operation) {
      const dto: Dto<Operation | null> = await facade.addService(operation, {
        name,
        price,
        note,
      });
      if (dto.next()) {
        setOperation(dto.data as Operation);
      }
      return dto;
    }
    return Dto.default();
  };
  const cancelBooking = async (): Promise<Dto<Operation | null>> => {
    if (!!operation && !!selectedBooking) {
      const dto: Dto<Operation | null> = await facade.cancelBooking(operation, {
        bookingId: selectedBooking.id,
      });
      if (dto.next()) {
        setOperation(dto.data as Operation);
        setSelectedBooking(null);
      }
      return dto;
    }
    return Dto.default();
  };
  const setBookingNote = async (
    newNote: string,
  ): Promise<Dto<Operation | null>> => {
    if (!!operation && !!selectedBooking) {
      const dto: Dto<Operation | null> = await facade.setBookingNote(
        operation,
        {
          bookingId: selectedBooking.id,
          note: newNote,
        },
      );
      if (dto.next()) {
        setOperation(dto.data as Operation);
      }
      return dto;
    }
    return Dto.default();
  };
  const setOperationDiscount = async (
    discount: number,
  ): Promise<Dto<Operation | null>> => {
    if (!!operation) {
      const dto: Dto<Operation | null> = await facade.setOperationDiscount(
        operation,
        {
          discount,
        },
      );
      if (dto.next()) {
        setOperation(dto.data as Operation);
      }
      return dto;
    }
    return Dto.default();
  };

  return {
    createOperation,
    getOperations,
    getOperation,
    enterOperation,
    booking,
    assignCustomer,
    addIssue,
    addService,
    cancelBooking,
    setBookingNote,
    setOperationDiscount,
  };
};
